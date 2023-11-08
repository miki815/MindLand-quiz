import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { GameService } from '../services/game.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-ko-zna-zna',
  templateUrl: './ko-zna-zna.component.html',
  styleUrls: ['./ko-zna-zna.component.css']
})
export class KoZnaZnaComponent implements OnInit {

  constructor(private gameService: GameService){}

  timer: number = 10;
  timerSubscription: Subscription;
  question: Question;
  btnDisabled: boolean = false;
  positionTrue: number = -1;
  btnClass: Array<string> = new Array(4);
  isPreparing: boolean = false;
  questionCnt: number = 1;
  correctCnt: number = 0;
  message: string = "Pokaži znanje i odgovori tačno na što više pitanja!";

  ngOnInit() {
    this.getQuestion();
    this.startTimer();
  }

  getQuestion(){
    this.gameService.getQuestion().subscribe((quest: Question)=>{
        if(quest) {
          this.question = quest;
          this.trueAnswerPosition();
        }
        else alert("Greska");
    })
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        if(this.isPreparing == true) this.getNewQuestion();
        else this.answerQuestion(0);
      }
    });
  }

  answerQuestion(answerId){
    this.btnClass[this.positionTrue - 1] = "true-answer";
    this.btnDisabled = true;
    if(answerId == this.positionTrue) {
      this.correctCnt++;
    }
    else if(answerId != 0){
      this.btnClass[answerId - 1] = "wrong-answer";
    }
    if(this.questionCnt++ == 5){
      this.message = "Igra je završena! Tačnih odgovora: " + this.correctCnt.toString();
      this.timer = 0;
      this.timerSubscription.unsubscribe();
    }
    else{
      this.timer = 3;
      this.isPreparing = true;
    }
  }

  trueAnswerPosition(){
    let pos = Math.floor(Math.random() * 3 + 1);
    let tmp = this.question.answer1;
    this.positionTrue = pos;
    if(pos == 1) return;
    else if(pos == 2) {
      this.question.answer1 = this.question.answer2;
      this.question.answer2 = tmp;
    }
    else if(pos == 3){
      this.question.answer1 = this.question.answer3;
      this.question.answer3 = tmp;
    }
    else{
      this.question.answer1 = this.question.answer4;
      this.question.answer4 = tmp;
    }
  }

  getNewQuestion(){
    this.getQuestion();
    this.isPreparing = false;
    this.timer = 10;
    this.btnDisabled = false;
    for(let i = 0;i < 4;i++) this.btnClass[i] = '';
  }

}
