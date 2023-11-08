import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moj-broj-multi',
  templateUrl: './moj-broj-multi.component.html',
  styleUrls: ['./moj-broj-multi.component.css']
})
export class MojBrojMultiComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket, private router: Router) { }

  zIndexStop: number = 2;
  zIndexConfirm: number = 1;
  timer: number = 5;
  isDisabled: boolean = true;
  timerSubscription: Subscription;
  number1: string = '?';
  number2: string = '??';
  number3: string = '???';
  myNumber: string = '?';
  expression: string = '';
  expressionOpponent: string = '';
  result: string = '0';
  gameStart: boolean = false;
  digitCounter: number = 0;
  playerIdent: number;
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


    this.socket.emit("playMyNumber", this.gameInfo.roomId);

    this.socket.on("startMyNumberTimer", () => {
      console.log('starting broj timer');
      this.startTimer();
    })

    this.socket.on("getNums", (myNumber, number1) => {
      console.log('setting up game');
      this.setupGame(myNumber, number1);
    })

    this.socket.on("finishGame", (gameData) => {
      this.finishGame(gameData);
    })
  }

  btnClickOrTimerEnd(){
    if(this.gameStart == false) this.socket.emit("requestNums", this.gameInfo.roomId);
  //  else this.socket.emit("sendRes", this.gameInfo.roomId, this.playerIdent);
  }

  startTimer() {
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0 && this.playerIdent == this.currentPlayerIdent && this.gameStart == false) this.btnClickOrTimerEnd();
        else if(this.timer === 0 && this.gameStart == true && this.isDisabled == false) this.sendResult();
      });
  }

  setupGame(myNumber, number1) {
    if (this.gameStart == false) {
      this.isDisabled = false;
      this.myNumber = myNumber;
      this.number1 =  number1;
      this.number2 = (Number(this.number1) * 11).toString();
      this.number3 =(Number(this.number1) * 111).toString();
      this.zIndexStop = 1;
      this.zIndexConfirm = 2;
      this.gameStart = true;
      this.timer = 60;
    }
  }

  sendResult(){
    if(this.expression.length > 0){
      console.log("sending result");
   //   this.timerSubscription.unsubscribe();
      this.isDisabled = true;
      if(this.result == '?') this.result = '0';
      let udaljenost = Math.abs(Number(this.myNumber) - Number(this.result));
     // alert("Iskorisceno cifara: " + this.digitCounter + "\nUdaljenost: " + udaljenost);
      this.socket.emit("sendResNumber", this.gameInfo.roomId, this.playerIdent, udaljenost, this.digitCounter, this.expression);
    }
  }

  insertParam(param: string){
    let n = this.expression.length;
    if((n > 0 && (param[0] >= '0' && param[0] <= '9') &&
     (this.expression.substring(n-1) >= '0' && this.expression.substring(n-1) <= '9')) == false){
    if(param[0] >= '0' && param[0] <= '9') this.digitCounter += param.length;
    this.expression += param;
    this.evaluateExpression();
     }
  }

  evaluateExpression() {
    try {
      this.result = eval(this.expression).toString();
    } catch (error) {
      console.error('Greška pri evaluaciji izraza:', error);
      this.result = '?';
    }
  }

  deleteExpression(){
    this.expression = '';
    this.digitCounter = 0;
    this.result = '0';
  }

  undoExpression(){ 
    let n = this.expression.length;  
    if(this.expression.substring(n-1) >= '0' && this.expression.substring(n-1) <= '9') this.digitCounter--;
    if(n > 0){
      this.expression = this.expression.slice(0, -1);
      this.evaluateExpression();
    }
  }

  finishGame(gameData){
    let winner = -1;
    if(gameData.blueDistance < gameData.redDistance) winner = 0;
    else if(gameData.redDistance < gameData.blueDistance) winner = 1;
    else if(gameData.blueDigits < gameData.redDigits) winner = 0;
    else if(gameData.redDigits < gameData.blueDigits) winner = 1;
    else winner = this.currentPlayerIdent;
    if(winner == 0) this.gameInfo.bluePoints += 10;
    else this.gameInfo.redPoints += 10;
    if(this.playerIdent == this.currentPlayerIdent){
      this.gameService.updateMojBrojStats(this.gameInfo.bluePlayer, this.gameInfo.redPlayer, gameData, winner).subscribe((resp)=>{
        if(resp) console.log('ok');
      });
    }
    this.timerSubscription.unsubscribe();
    if(this.playerIdent == 0)
      this.showResults(gameData.redExpr);
    else this.showResults(gameData.blueExpr);
  }

  showResults(opponentExpr){
    const source = interval(1000);
    this.timer = 5;
    this.expressionOpponent = opponentExpr;
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        if(this.currentPlayerIdent == 1) {
          sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
          this.router.navigate(['../skocko-multi']);
        }
        else {
          this.currentPlayerIdent = 1 - this.currentPlayerIdent;
          this.resetGame();
        }
      };
    });
  }

  resetGame(){
    this.timerSubscription.unsubscribe();
    this.zIndexStop = 2;
    this.zIndexConfirm = 1;
    this.timer = 5;
    this.isDisabled = true;
    this.number1 = '?';
    this.number2 = '??';
    this.number3 = '???';
    this.myNumber = '?';
    this.expression = '';
    this.expressionOpponent = '';
    this.result = '0';
    this.gameStart = false;
    this.digitCounter = 0;
    this.isDisabled = true;
    this.socket.emit("playMyNumber", this.gameInfo.roomId);
  }
}
