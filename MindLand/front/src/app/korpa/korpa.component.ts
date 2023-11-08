import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  constructor() { }

  message: string = 'Nadmudri svog protivnika!';
  kasa: Array<number> = new Array(15);
  korpaBlue: Array<number> = new Array(5);
  korpaRed: Array<number> = new Array(5);
  timer: number = 7;
  timerSubscription: Subscription;
  blueMove = 1;
  blueIndex = 0;
  redIndex = 0;
  btnDisabled: boolean = false;
  btnHidden: boolean = false;
  boundarySum: number;
  currentSum: number;
  gameStarted: boolean = false;

  ngOnInit(): void {
    for(let i = 0;i < 15; i++) this.kasa[i] = (Math.floor(Math.random() * 50) + 1);
    this.startTimer();
  }

  startTimer() {
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          if(this.btnDisabled == false) this.chooseNumber(-1);
          else this.addNumber(-1, this.blueMove);
        }
      });
  }


  chooseNumber(kasaIndex){
    if(kasaIndex == -1){
      kasaIndex = 0;
      for(;kasaIndex < 15; kasaIndex++) if(this.kasa[kasaIndex] != undefined) break;
    }
    else if(this.kasa[kasaIndex] == undefined) return;
    if(this.blueMove){
      this.korpaBlue[this.blueIndex++] = this.kasa[kasaIndex];
      this.timer = 7;
    }
    else{
      this.korpaRed[this.redIndex++] = this.kasa[kasaIndex];
      this.timer = 7;
      if(this.redIndex == 5){
        this.btnDisabled = true;
        this.message = "Brojevi izabrani. Igra sada počinje!";
        this.currentSum = 0;
        this.boundarySum = (Math.floor(Math.random() * 31) + 70);
        this.gameStarted = true;
      }
    }
    this.blueMove = 1 - this.blueMove;
    this.kasa[kasaIndex] = undefined;
  }

  addNumber(numberIndex, isBlue){
    if(isBlue != this.blueMove) return;
    if(numberIndex == -1){
      numberIndex = 0;
      if(this.blueMove == 1) while(this.korpaBlue[numberIndex] == undefined) numberIndex++; 
      else while(this.korpaRed[numberIndex] == undefined) numberIndex++; 
    }
    else if((this.blueMove == 1 && this.korpaBlue[numberIndex] == undefined) || 
            (this.blueMove == 0 && this.korpaRed[numberIndex] == undefined)) return;
    if(this.blueMove == 1) {
      this.currentSum += this.korpaBlue[numberIndex];
      this.korpaBlue[numberIndex] = undefined;
    }
    else{
      this.currentSum += this.korpaRed[numberIndex];
      this.korpaRed[numberIndex] = undefined;
    }
    if(this.currentSum > this.boundarySum){
      this.timerSubscription.unsubscribe();
      if(this.blueMove == 0) this.message = "Igra gotova. Pobedili ste, čestitamo!";
      else this.message = "Igra gotova. Nažalost izgubili ste, vežbajte još!";
      this.gameStarted = false;
    }
    this.blueMove = 1 - this.blueMove;
    this.timer = 7;
  }

  


}
