import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpa-multi',
  templateUrl: './korpa-multi.component.html',
  styleUrls: ['./korpa-multi.component.css']
})
export class KorpaMultiComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket, private router: Router) { }

  message: string = 'Nadmudri svog protivnika!';
  kasa: Array<number> = new Array(15);
  korpaBlue: Array<number> = new Array(5);
  korpaRed: Array<number> = new Array(5);
  timer: number = 7;
  timerSubscription: Subscription;
  blueIndex = 0;
  redIndex = 0;
  btnDisabled: boolean = false;
  btnHidden: boolean = false;
  boundarySum: number;
  currentSum: number;
  gameStarted: boolean = false;
  playerIdent: number;
  gameCnt: number = 0;
  currentPlayerIdent: number = 0;
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


    this.socket.emit("playKorpa", this.gameInfo.roomId);

    this.socket.on("startKorpaTimer", (kasaInfo) => {
      console.log('starting korpa timer');
      for(let i = 0;i < 15; i++) this.kasa[i] = kasaInfo[i];
      this.startTimer();
    })

    this.socket.on("chooseNumberKorpa", (index) => {
      console.log('choose korpa number');
      this.chooseNumber(index);
    })

    this.socket.on("selectNumberKorpa", (index) => {
      console.log('select korpa number');
      this.addNumber(index);
    })

    this.socket.on("startKorpaGame", (boundary) => {
      console.log('starting korpa game');
      this.startKorpaGame(boundary);
    })

  }

  startTimer() {
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          if(this.btnDisabled == false) this.kasaClick(-1);
          else this.korpaClick(-1, this.currentPlayerIdent);
        }
      });
  }

  kasaClick(kasaIndex){
    if(this.playerIdent != this.currentPlayerIdent) return;
    this.socket.emit("chooseNumberKorpaRequest", this.gameInfo.roomId, kasaIndex);
  }

  korpaClick(index, korpaIdent){
    if((this.playerIdent != this.currentPlayerIdent) || (this.playerIdent != korpaIdent)) return;
    this.socket.emit("selectNumberKorpaRequest", this.gameInfo.roomId, index);
  }

  startKorpaGame(boundary){ // after kasa finish
    this.gameStarted = true;
    this.currentSum = 0;
    this.boundarySum = boundary;
    this.gameCnt++;
    this.startTimer();
  }

  chooseNumber(kasaIndex){
    if(kasaIndex == -1){ // time = 0, choose first available number
      kasaIndex = 0;
      for(;kasaIndex < 15; kasaIndex++) if(this.kasa[kasaIndex] != undefined) break;
    }
    else if(this.kasa[kasaIndex] == undefined) return;
    if(this.currentPlayerIdent == 0) this.korpaBlue[this.blueIndex++] = this.kasa[kasaIndex];
    else this.korpaRed[this.redIndex++] = this.kasa[kasaIndex];  
    this.timer = 7;

    if(this.redIndex == 5 && this.blueIndex == 5){
      this.timerSubscription.unsubscribe();
      this.timer = 10;
      this.btnDisabled = true;
      this.message = "Brojevi izabrani. Igra sada počinje!";
      this.currentPlayerIdent = 1 - this.currentPlayerIdent;
      this.kasa[kasaIndex] = undefined;
      if(this.playerIdent == this.currentPlayerIdent)
        this.socket.emit("kasaFinish", this.gameInfo.roomId);
      return;
    }
    
    this.currentPlayerIdent = 1 - this.currentPlayerIdent;
    this.kasa[kasaIndex] = undefined;
  }

  addNumber(numberIndex){
    if(numberIndex == -1){
      numberIndex = 0;
      if(this.currentPlayerIdent == 0) while(this.korpaBlue[numberIndex] == undefined) numberIndex++; 
      else while(this.korpaRed[numberIndex] == undefined) numberIndex++; 
    }
    else if((this.currentPlayerIdent == 0 && this.korpaBlue[numberIndex] == undefined) || 
            (this.currentPlayerIdent == 1 && this.korpaRed[numberIndex] == undefined)) return;
    if(this.currentPlayerIdent == 0) {
      this.currentSum += this.korpaBlue[numberIndex];
      this.korpaBlue[numberIndex] = undefined;
    }
    else{
      this.currentSum += this.korpaRed[numberIndex];
      this.korpaRed[numberIndex] = undefined;
    }
    if(this.currentSum > this.boundarySum){ // game over
      this.gameOver();
      return;
    }
    this.currentPlayerIdent = 1 - this.currentPlayerIdent;
    this.timer = 10;
  }

  gameOver(){
    if(this.currentPlayerIdent == 1 - this.playerIdent) {
      this.message = "Igra gotova. Pobedili ste, čestitamo!";
      if(this.playerIdent == 0) {
        this.gameService.updateKorpaStats(this.gameInfo.bluePlayer, this.gameInfo.redPlayer).subscribe((resp)=>{
          if(resp) console.log('ok');
        });
      }
      else {
        this.gameService.updateKorpaStats(this.gameInfo.redPlayer, this.gameInfo.bluePlayer).subscribe((resp)=>{
          if(resp) console.log('ok');
        });
      }
    }
    else {
      this.message = "Igra gotova. Nažalost izgubili ste, vežbajte još!";
    }
    if(this.currentPlayerIdent == 0) this.gameInfo.redPoints += 10;
    else this.gameInfo.bluePoints += 10;
    this.gameStarted = false;
    this.currentPlayerIdent = 1 - this.currentPlayerIdent;
    this.timer = 10;
    this.timerSubscription.unsubscribe();
    const source = interval(1000);
    this.timer = 5;
    this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          if(this.gameCnt == 1) this.resetGame();
          else {
            sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
            this.router.navigate(['../pitanja-multi']);
          }
        };
    });
  }

  resetGame(){
    this.currentPlayerIdent = 1;
    this.timerSubscription.unsubscribe();
    this.currentSum = null;
    this.boundarySum = null;
    this.btnDisabled = false;
    this.redIndex = 0;
    this.blueIndex = 0;
    this.timer = 7;
    this.gameStarted = false;
    for(let i = 0;i < 5; i++) this.korpaBlue[i] = null, this.korpaRed[i] = null;
    this.socket.emit("playKorpa", this.gameInfo.roomId);
  }
}
