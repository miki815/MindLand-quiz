import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  constructor(private router: Router, private socket: Socket) { }

  timer: number = 5;
  timerSubscription: Subscription;
  myRoomId: string;
  playerIdent: number;
  player: User;
  bluePlayer: string;
  redPlayer: string;
  blueRating: number;
  redRating: number;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    console.log(`username ${this.player.username} rating ${this.player.rating}`)
    this.socket.emit("playerArrive", this.player.username, this.player.rating);

    this.socket.on("setPlayer", (ident) => {
      console.log(`setting player ${ident}`);
      this.playerIdent = ident;
      if(ident == 0) this.bluePlayer = this.player.username, this.blueRating = this.player.rating;
    })

    this.socket.on("startTimer", (gameInfo) => {
      console.log("setting game");
      this.bluePlayer = gameInfo.bluePlayer, this.redPlayer = gameInfo.redPlayer;
      this.blueRating = gameInfo.blueRating, this.redRating = gameInfo.redRating;
      let myGameInfo = {
        bluePlayer: gameInfo.bluePlayer,
        redPlayer:gameInfo.redPlayer,
        blueRating: gameInfo.blueRating,
        redRating: gameInfo.redRating,
        roomId: gameInfo.roomId,
        myIdent: this.playerIdent,
        bluePoints: 0,
        redPoints: 0
      };
      console.log(`blue ${myGameInfo.bluePlayer}, red ${myGameInfo.bluePlayer}, ratingBlue ${myGameInfo.blueRating}`);
      this.myRoomId = gameInfo.roomId;
      console.log(`room ${this.myRoomId}`);
      sessionStorage.setItem('game', JSON.stringify(myGameInfo));
      this.startTimer();
    })

    this.socket.on("startGame", () => {
      this.router.navigate(['../asocijacije-multi']);
    })
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      if(this.timer != null) this.timer--;
      if (this.timer === 0 && this.playerIdent == 0) {
         this.socket.emit("startGameRequest", this.myRoomId);
      }
    });
  }
}
