import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { User } from '../models/user';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.css']
})
export class FinishGameComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  gameInfo: {
    bluePlayer: null;
    blueRating: null;
    redPlayer:null;
    redRating: null;
    roomId: null;
    myIdent: null;
    bluePoints: 0;
    redPoints: 0;
  };
  winner: string;
  winnerIdent: number;
  newRating: number;
  myRating: number;
  player: User;
 

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.gameInfo = JSON.parse(sessionStorage.getItem('game'));
    if(this.gameInfo.bluePoints > this.gameInfo.redPoints) {
      this.winner = this.gameInfo.bluePlayer;
      this.winnerIdent = 0;
    }
    else{
      this.winner = this.gameInfo.redPlayer;
      this.winnerIdent = 1;
    }
    if(this.gameInfo.myIdent == 0) {
      this.myRating = this.gameInfo.blueRating;
      this.newRating = this.calculateRating(this.gameInfo.blueRating, this.gameInfo.redRating, 1 - this.winnerIdent,  32);
      this.animateRatingChange(this.gameInfo.blueRating, this.newRating);
      this.updateStats(this.gameInfo.bluePlayer, this.newRating, 1 - this.winnerIdent)
    }
    else {
      this.myRating = this.gameInfo.redRating;
      this.newRating = this.calculateRating(this.gameInfo.redRating, this.gameInfo.blueRating, this.winnerIdent,  32);
      this.animateRatingChange(this.gameInfo.redRating, this.newRating);
      this.updateStats(this.gameInfo.redPlayer, this.newRating, this.winnerIdent)
    }
    this.player.rating = this.newRating;
    this.player.tokens = this.gameInfo.myIdent == this.winnerIdent ? this.player.tokens + 10 : this.player.tokens - 20;
    sessionStorage.setItem("User", JSON.stringify(this.player));

  }

  goHome(){
    this.router.navigate(['../homepage']);
  }

  calculateRating(currRating, opponentRating, actualResult, kFactor) {
    const expectedOutcome = 1 / (1 + Math.pow(10, (opponentRating - currRating) / 400));
    const eloChange = Math.round(kFactor * (actualResult - expectedOutcome));
    const newRating = currRating + eloChange;
    return newRating;
  }

  animateRatingChange(initialRating, finalRating) {
    const duration = 3000; 
    const frameRate = 60; 
    const step = (finalRating - initialRating) / (duration / 1000 * frameRate);
    let currentRating = initialRating;
    const interval = setInterval(() => {
      currentRating += step;
      this.myRating = Math.round(currentRating);
      if ((step > 0 && currentRating >= finalRating) || (step < 0 && currentRating <= finalRating)) {
        clearInterval(interval);
      }
    }, 1000 / frameRate);
  }

  updateStats(username, newRating, isWin){
    this.gameService.updateStats(username, newRating, isWin).subscribe(ans=>{
      if(ans) console.log("stats updated");
      else alert("Greska");
    })
  }

}
