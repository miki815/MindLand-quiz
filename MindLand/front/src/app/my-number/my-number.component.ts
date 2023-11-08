import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-my-number',
  templateUrl: './my-number.component.html',
  styleUrls: ['./my-number.component.css']
})
export class MyNumberComponent implements OnInit {

  constructor() { }

  zIndexStop: number = 2;
  zIndexConfirm: number = 1;
  timer: number = 5;
  isDisabled: boolean = true;
  isTimerRunning: boolean = false;
  timerSubscription: Subscription;
  number1: string = '?';
  number2: string = '??';
  number3: string = '???';
  myNumber: string = '?';
  expression: string = '';
  result: string = '0';
  timerCounter: number = 0;
  digitCounter: number = 0;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0) this.stopTimer();
      });
    }
  }

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timerCounter == 0) {
     // this.timerSubscription.unsubscribe();
      this.isDisabled = false;
      this.myNumber = (Math.floor(Math.random() * 999) + 1).toString();
      this.number1 =  (Math.floor(Math.random() * 9) + 1).toString();
      this.number2 = (Number(this.number1) * 11).toString();
      this.number3 =(Number(this.number1) * 111).toString();
      this.zIndexStop = 1;
      this.zIndexConfirm = 2;
      this.timerCounter = 1;
      this.timer = 60;
    }
    else{
      if(this.expression.length > 0){
        this.timerSubscription.unsubscribe();
        this.isDisabled = true;
        let udaljenost = Math.abs(Number(this.myNumber) - Number(this.result))
        alert("Iskorisceno cifara: " + this.digitCounter + "\nUdaljenost: " + udaljenost)
      }
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

}
