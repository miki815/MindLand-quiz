import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { GameService } from '../services/game.service';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-ko-zna-zna-multi',
  templateUrl: './ko-zna-zna-multi.component.html',
  styleUrls: ['./ko-zna-zna-multi.component.css']
})
export class KoZnaZnaMultiComponent implements OnInit {

  constructor(private gameService: GameService,  private socket: Socket, private router: Router){}

  timer: number = 10;
  timerSubscription: Subscription;
  question: Question;
  btnDisabled: boolean = false;
  positionTrue: number = -1;
  btnClass: Array<string> = new Array(4);
  isPreparing: boolean = false;
  questionCnt: number = 0;
  correctCnt: number = 0;
  blueStealClass: string = '';
  redStealClass: string = '';
  stealUsed: boolean = false;
  message: string = "Pokaži znanje i odgovori tačno na što više pitanja!";
  playerIdent: number;
  gameCnt: number = 0;
  currentPlayerIdent: number = 0;
  idPitanja: Array<number>;
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
  gameStats:{
    players: Array<string>;
    pitanjaTrue: Array<number>;
    pitanjaFalse: Array<number>;
    pitanjaDalje: Array<number>;
    pitanjaUkradi: Array<number>;
  } = {
    players: [null, null],
    pitanjaTrue: [0, 0],
    pitanjaFalse: [0, 0],
    pitanjaDalje: [0, 0],
    pitanjaUkradi: [0, 0]
  };

  ngOnInit() {
    this.gameInfo = JSON.parse(sessionStorage.getItem('game'));
    this.playerIdent = this.gameInfo.myIdent;
    this.gameStats.players[0] = this.gameInfo.bluePlayer;
    this.gameStats.players[1] = this.gameInfo.redPlayer;



    this.socket.emit("playPitanja", this.gameInfo.roomId);

    this.socket.on("startPitanja", (idPitanja) => { 
      console.log('starting pitanja');
      this.idPitanja = idPitanja;
      this.getQuestionById(this.idPitanja[0]);
      this.startTimer();
    })

    this.socket.on("answerData", (blueAnswerId, redAnswerId, first) => { 
      this.answerQuestion(blueAnswerId, redAnswerId, first);
    })

  }

  answerBtnClick(answerId){
    if(answerId != 0 && answerId != -1){
      if(this.playerIdent == 0)  this.btnClass[answerId - 1] = "blue-answer";
      else this.btnClass[answerId - 1] = "red-answer";
    }
    this.btnDisabled = true;
    this.socket.emit("answerInfo", this.gameInfo.roomId, this.playerIdent, answerId);
  }

  getQuestionById(id){
    this.gameService.getQuestionById(id).subscribe((quest: Question)=>{
        if(quest) this.question = quest;
        else alert("Greska");
    })
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        if(this.isPreparing == true) {
          if(this.questionCnt < 5) this.getNewQuestion();
          else{
            this.timerSubscription.unsubscribe();
            if(this.playerIdent == 0){
              this.gameService.updatePitanjaStats(this.gameStats).subscribe((resp)=>{
                if(resp) console.log('ok');
              });
            }
            sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
            this.router.navigate(['../asocijacije-multi']);
          }
        }
        else if(this.btnDisabled == false) this.answerBtnClick(0);
      }
    });
  }

  answerQuestion(blueAnswerId, redAnswerId, firstIdent){
    console.log(`blue answer ${blueAnswerId}, red answer ${redAnswerId}`);
    if(blueAnswerId == -1 || redAnswerId == -1)  {
      console.log("stealing");
      this.stealPoints(blueAnswerId, redAnswerId);
    }
    else if(blueAnswerId == redAnswerId && blueAnswerId != 0) {
      console.log("same");
      if(blueAnswerId == this.question.correctAnswer) {
        this.gameStats.pitanjaTrue[0]++; this.gameStats.pitanjaTrue[1]++;
        this.btnClass[blueAnswerId - 1] = "same-true-answer";
        if(firstIdent == 0) this.gameInfo.bluePoints += 10;
        else this.gameInfo.redPoints += 10;
      }
      else {
        this.gameStats.pitanjaFalse[0]++; this.gameStats.pitanjaFalse[1]++;
        this.btnClass[blueAnswerId - 1] = "same-answer";
        this.btnClass[this.question.correctAnswer - 1] = "true-answer";
        this.gameInfo.bluePoints -= 5;
        this.gameInfo.redPoints -= 5;
      }
    }
    else if(blueAnswerId == this.question.correctAnswer){
      this.gameStats.pitanjaTrue[0]++;
      console.log("blue true");
      this.gameInfo.bluePoints += 10;
      this.btnClass[blueAnswerId - 1] = "blue-true-answer";
      if(redAnswerId != 0) 
        this.btnClass[redAnswerId - 1] = "red-answer", this.gameInfo.redPoints -= 5, this.gameStats.pitanjaFalse[1]++;
      else this.gameStats.pitanjaDalje[1]++;
    }
    else if(redAnswerId == this.question.correctAnswer){
      this.gameStats.pitanjaTrue[1]++;
      console.log("red true");
      this.gameInfo.redPoints += 10;
      this.btnClass[redAnswerId - 1] = "red-true-answer";
      if(blueAnswerId != 0) 
        this.btnClass[blueAnswerId - 1] = "blue-answer", this.gameInfo.bluePoints -= 5, this.gameStats.pitanjaFalse[0]++;
      else this.gameStats.pitanjaDalje[0]++;
    }
    else{
      console.log("wrong");
      this.btnClass[this.question.correctAnswer - 1] = "true-answer";
      if(blueAnswerId != 0)
        this.btnClass[blueAnswerId - 1] = "blue-answer", this.gameInfo.bluePoints -= 5, this.gameStats.pitanjaFalse[0]++;
      else this.gameStats.pitanjaDalje[0]++;
      if(redAnswerId != 0) 
        this.btnClass[redAnswerId - 1] = "red-answer", this.gameInfo.redPoints -= 5, this.gameStats.pitanjaFalse[1]++;
      else this.gameStats.pitanjaDalje[1]++;
    }
    this.timer = 3;
    this.isPreparing = true;
  }

  stealPoints(blueAnswerId, redAnswerId){
    if(blueAnswerId == -1 && redAnswerId == -1){
      this.stealUsed = true;
      this.blueStealClass = "user-secret-icon";
      this.redStealClass = "user-secret-icon";
      this.btnClass[this.question.correctAnswer - 1] = "true-answer";
      return;
    }
    else if(blueAnswerId == -1){
      if(this.playerIdent == 0) this.stealUsed = true;
      this.blueStealClass = "user-secret-icon";
      if(redAnswerId == this.question.correctAnswer) {
        this.gameInfo.bluePoints += 10;
        this.gameStats.pitanjaUkradi[0]++;
        this.btnClass[redAnswerId - 1] = "red-true-answer";
      }
      else if(redAnswerId != 0) {
        this.gameInfo.bluePoints -= 5;
        this.btnClass[redAnswerId - 1] = "red-answer";
        this.btnClass[this.question.correctAnswer - 1] = "true-answer";
      }
      else this.btnClass[this.question.correctAnswer - 1] = "true-answer";
    }
    else if(redAnswerId == -1){
      if(this.playerIdent == 1) this.stealUsed = true;
      this.redStealClass = "user-secret-icon";
      if(blueAnswerId == this.question.correctAnswer) {
        this.gameInfo.redPoints += 10;
        this.gameStats.pitanjaUkradi[1]++;
        this.btnClass[redAnswerId - 1] = "blue-true-answer";
      }
      else if(blueAnswerId != 0) {
        this.gameInfo.redPoints -= 5;
        this.btnClass[blueAnswerId - 1] = "blue-answer";
        this.btnClass[this.question.correctAnswer - 1] = "true-answer";
      }
      else this.btnClass[this.question.correctAnswer - 1] = "true-answer";
    }
  }

  getNewQuestion(){
    this.questionCnt++
    this.getQuestionById(this.questionCnt);
    this.isPreparing = false;
    this.btnDisabled = false;
    for(let i = 0;i < 4;i++) this.btnClass[i] = '';
    this.timer = 10;
  }


}
