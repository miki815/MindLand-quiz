import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skocko-multi',
  templateUrl: './skocko-multi.component.html',
  styleUrls: ['./skocko-multi.component.css']
})
export class SkockoMultiComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket, private router: Router) { }

  tableIcons: Array<Array<string>> = new Array(7);
  combination: Array<number> = new Array(4);
  combinationIcons: Array<string> = new Array(4);
  currentCombination: Array<number> = new Array(4); 
  test: string = '';
  currentRow: number = 0;
  currentColumn: number = 0;
  btnDisabled: boolean = false;
  message: string = 'Razbij šifru!'
  playerIdent: number;
  currentPlayerIdent: number = 0;
  myRoomId: string;
  timerSubscription: Subscription;
  timer: number = 90;
  gameCnt: number = 0;
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


  ngOnInit(): void {
    
    this.gameInfo = JSON.parse(sessionStorage.getItem('game'));
    this.playerIdent = this.gameInfo.myIdent;
    this.myRoomId = this.gameInfo.roomId;


    this.socket.emit("playSkocko", this.gameInfo.roomId);

    this.socket.on("checkCombo", combo => {
      console.log('checking combo!');
      this.checkGuess(combo);
    })

    this.socket.on("startSkockoTimer", (combo) => {
      console.log('starting timer');
      this.gameCnt++;
      this.startTimer(combo);
    })

    this.socket.on("setPlayer", (ident) => {
      console.log(`setting player ${ident}`);
      this.playerIdent = ident;
    })

    this.socket.on("changePlayer", (ident) => {
      this.currentPlayerIdent = 1 - this.currentPlayerIdent;
      this.timer = 20;
      this.currentRow = 6;
    })

    this.socket.on("endSkocko", () => {
      this.finishGame(7);
    })

    for(let i = 0;i < 7;i++) this.tableIcons[i] = new Array(8);
    for(let i = 0; i < 4; i++) this.combination[i] = this.currentCombination[i] = -1;
  }

  addSymbol(name, ident){
    if(this.playerIdent != this.currentPlayerIdent) return;
    for(let i = 0;i < 4; i++){
      if(this.currentCombination[i] == -1){
        this.tableIcons[this.currentRow][i] = name;
        this.currentCombination[i] = ident;
        return;
      }
    }
  }

  deleteSymbol(row, col){
    if(this.playerIdent != this.currentPlayerIdent) return;
    if(this.currentRow != row) return;
    this.currentCombination[col] = -1;
    this.tableIcons[row][col] = '';
  }

  revealCombination(){
    for(let i = 0; i < 4; i++) {
      if(this.combination[i] == 0) this.combinationIcons[i] = 'fas fa-ice-cream ice-cream-icon';
      else if(this.combination[i] == 1) this.combinationIcons[i] = 'fas fa-heart heart-icon';
      else if(this.combination[i] == 2) this.combinationIcons[i] = 'fas fa-book book-icon';
      else if(this.combination[i] == 3) this.combinationIcons[i] = 'fas fa-tint tint-icon';
      else if(this.combination[i] == 4) this.combinationIcons[i] = 'fas fa-star star-icon';
      else if(this.combination[i] == 5) this.combinationIcons[i] = 'fas fa-gem gem-icon';
    }
  }

  checkGuess(combo){
    for(let i = 0; i < 4; i++) {
      if(combo[i] == 0) this.tableIcons[this.currentRow][i] = 'fas fa-ice-cream ice-cream-icon';
      else if(combo[i] == 1) this.tableIcons[this.currentRow][i] = 'fas fa-heart heart-icon';
      else if(combo[i] == 2) this.tableIcons[this.currentRow][i] = 'fas fa-book book-icon';
      else if(combo[i] == 3) this.tableIcons[this.currentRow][i] = 'fas fa-tint tint-icon';
      else if(combo[i] == 4) this.tableIcons[this.currentRow][i] = 'fas fa-star star-icon';
      else if(combo[i] == 5) this.tableIcons[this.currentRow][i] = 'fas fa-gem gem-icon';
    }
    let found = [-1,-1,-1,-1];
    let cntGreen = 0, cntYellow = 0;
    for(let i = 0; i < 4; i++) {
      if(combo[i] == this.combination[i]) found[i] = i, cntGreen++; // right place
      if(i == 3 && found[0] == 0 && found[1] == 1 && found[2] == 2 && found[3] == 3){
        this.message = 'Čestitamo! Razbili ste šifru! Igra je završena!';
        this.finishGame(this.currentRow);
        this.btnDisabled = true;
        let cursor = 4;
        for(let i = 0;i < 4; i++) this.tableIcons[this.currentRow][cursor++] = 'right-position';
        this.currentRow = -1;
        return;
      }
    }
    for(let i = 0; i < 4; i++) {
      for(let j = 0;j < 4;j++){
        if(combo[i] == this.combination[i]) break;
        if(combo[i] == this.combination[j] && found.includes(j) == false) {
          found[i] = j; // found but not at right place
          cntYellow++;
          break;
        }
      }   
    }
    let cnt = 4;
    for(let i = 0;i < cntGreen; i++) this.tableIcons[this.currentRow][cnt++] = 'right-position';
    for(let i = 0;i < cntYellow; i++) this.tableIcons[this.currentRow][cnt++] = 'wrong-position';
    this.currentRow++;
    this.currentColumn = 0;
    for(let i = 0;i < 4; i++) this.currentCombination[i] = -1;
    if(this.currentRow == 6 && this.playerIdent == this.currentPlayerIdent){
      this.socket.emit("changePlayer", this.myRoomId);
    }
    else if(this.currentRow == 7) this.finishGame(7);
  }

  startTimer(combo) {
    for(let i = 0; i < 4; i++) this.combination[i] = combo[i];
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      if(this.timer != null) this.timer--;
      if (this.timer === 0 && this.currentPlayerIdent == this.playerIdent) {
        if(this.currentRow == 6) this.socket.emit("endSkockoRequest", this.myRoomId);
        else this.socket.emit("changePlayer", this.myRoomId);
      }
    });
  }

  potvrdiClick(){
    for(let i = 0; i < 4; i++) if(this.currentCombination[i] == -1) return;
    this.socket.emit("checkRequest", this.myRoomId, this.currentCombination);
  }

  finishGame(move){
    let points = 0;
    if(move == 0) points = 30;
    else if(move == 1) points = 25;
    else if(move == 2 || move == 3) points = 20;
    else if(move == 4) points = 15;
    else if(move == 5 || move == 6) points = 10;
    if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += points;
    else this.gameInfo.redPoints += points;
    this.revealCombination();
    this.timerSubscription.unsubscribe();
    this.timer = 0;
    let found = move > 5 ? false: true;
    if(this.gameCnt == 1 && this.playerIdent == this.currentPlayerIdent){
      this.gameService.updateSkockoStats(this.gameInfo.bluePlayer, found, move).subscribe((resp)=>{
        if(resp) console.log('ok');
      });
    } else if(this.gameCnt == 2 && this.playerIdent == this.currentPlayerIdent){
      this.gameService.updateSkockoStats(this.gameInfo.redPlayer, found, move).subscribe((resp)=>{
        if(resp) console.log('ok');
      });
    }
    this.resetGame();
  }

  resetGame(){
    const source = interval(1000);
    this.timer = 5;
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timerSubscription.unsubscribe();
        if(this.gameCnt == 2){
          sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
          this.router.navigate(['../korpa-multi']);
        } 
        else {
          this.currentPlayerIdent = 1;
          for(let i = 0;i < 7;i++) this.tableIcons[i] = ['', '', '', '', '', '', '', ''];
          for(let i = 0;i < 4; i++) this.currentCombination[i] = -1, this.combinationIcons[i] = "";
          this.btnDisabled = false;
          this.currentRow = 0;
          this.currentColumn = 0;
          this.message = "Crveni na potezu"
          this.timer = 90;
          this.socket.emit("playSkocko", this.gameInfo.roomId);
        }
      };
    });
  }
}
