import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slovoteka',
  templateUrl: './slovoteka.component.html',
  styleUrls: ['./slovoteka.component.css']
})
export class SlovotekaComponent implements OnInit {

  constructor() { }

  isDisabled: boolean = false;
  timer: number = 5;
  timerSubscription: Subscription;
  zIndexStop: number = 2;
  zIndexConfirm: number = 1;
  letters: Array<string> = new Array(12);
  allLetters: Array<string> = ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ',
                            'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш'];
  word: string = '';
  wordNums: Array<number> = new Array(12);
  wordNumsIndex = 0;
  gameStart: boolean = false;
  words: Array<string> = [];
  score: number = 0;
  message: string = 'Zaustavi slova i započni igru!';


  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(){
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if (this.timer === 0) this.stopTimer();
      });
  }

  stopTimer(){
    if (this.gameStart == false) { // start game
      for(let i = 0; i < 12; i++) this.letters[i] = this.allLetters[Math.floor(Math.random() * 30)];
      this.isDisabled = false;
      this.zIndexStop = 1;
      this.zIndexConfirm = 2;
      this.timer = 60;
      this.gameStart = true;
      this.message = "Brzo! Sakupi što više reči za 60 sekundi!"
    }
    else{ // end game
        this.timerSubscription.unsubscribe();
        this.isDisabled = true;
        for(let i = 0;i < 12; i++) this.letters[i] = undefined;
        this.word = '';
        this.message = "Vreme je isteklo! Ukupno: " + this.score.toString() + " poena";
    }
  }

  chooseLetter(letterIndex){
    if(this.letters[letterIndex] == undefined) return;
    this.word += this.letters[letterIndex];
    this.wordNums[this.wordNumsIndex++] = letterIndex;
    this.letters[letterIndex] = undefined;
  }

  undoLetter(){
    let n = this.word.length;
    if(n == 0) return;
    let letter = this.word.substring(n-1);
    this.word = this.word.slice(0, -1);
    this.letters[this.wordNums[--this.wordNumsIndex]] = letter;
  }

  deleteWord(){
    for(let i = 0;i < this.word.length; i++) this.letters[this.wordNums[i]] = this.word[i];
    this.word = '';
    this.wordNumsIndex = 0;
  }

  addWord(){
    if(this.word == '') return;
    this.score += this.word.length / 2;
    this.words[this.words.length] = this.word;
    this.deleteWord();
  }

}
