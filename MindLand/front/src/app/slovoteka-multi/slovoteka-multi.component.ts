import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slovoteka-multi',
  templateUrl: './slovoteka-multi.component.html',
  styleUrls: ['./slovoteka-multi.component.css']
})
export class SlovotekaMultiComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket, private router: Router) { }

  isDisabled: boolean = false;
  timer: number = 5;
  timerSubscription: Subscription;
  zIndexStop: number = 2;
  zIndexConfirm: number = 1;
  letters: Array<string> = new Array(12);
  allLetters: Array<string> = ['а', 'б', 'в', 'г', 'д', 'ђ', 'е', 'ж', 'з', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ',
                            'о', 'п', 'р', 'с', 'т', 'ћ', 'у', 'ф', 'х', 'ц', 'ч', 'џ', 'ш'];
  word: string = '';
  wordNums: Array<number> = new Array(12);
  wordNumsIndex = 0;
  gameStart: boolean = false;
  words: Array<string> = [];
  opponentWords: Array<string> = [];
  score: number = 0;
  message: string = 'Zaustavi slova i započni igru!';
  playerIdent: number;
  currentPlayerIdent: number = 0;
  myRoomId: string;
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
    longestWord: Array<number>;
    totalWords: Array<number>;
    totalLetters: Array<number>;
    wins: Array<number>;
  } = {
    players: [null, null],
    longestWord: [0, 0],
    totalWords: [0, 0],
    totalLetters: [0, 0],
    wins: [0, 0]
  };


  ngOnInit(): void {
    this.gameInfo = JSON.parse(sessionStorage.getItem('game'));
    this.playerIdent = this.gameInfo.myIdent;
    this.myRoomId = this.gameInfo.roomId;
    this.gameStats.players[0] = this.gameInfo.bluePlayer;
    this.gameStats.players[1] = this.gameInfo.redPlayer;

    this.socket.emit("playSlovoteka", this.gameInfo.roomId);

    this.socket.on("startSlovotekaTimer", () => {
      console.log('starting slovoteka');
      this.startTimer();
    })

    this.socket.on("getLetters", (serverLetters) => {
      console.log("getting letters")
      this.startSlovoteka(serverLetters);
    })

    this.socket.on("finishSlovoteka", (slovotekaData) => {
      console.log("getting slovoteka data")
      this.finishCurrentGame(slovotekaData);
    })

  }

  startTimer(){
      const source = interval(1000);
      this.timerSubscription = source.subscribe(() => {
        this.timer--;
        if(this.timer === 0) {
          if(this.gameStart == false && this.playerIdent == this.currentPlayerIdent) this.stopTimer();
          else if(this.gameStart == true) this.stopTimer();
        } 
      });
  }

  stopTimer(){
    if(this.gameStart == false) this.socket.emit("requestLetters", this.gameInfo.roomId); // start game
    else{ // end game
        this.timerSubscription.unsubscribe();
        this.isDisabled = true;
        for(let i = 0;i < 12; i++) this.letters[i] = undefined;
        this.word = '';
       // this.message = "Vreme je isteklo! Ukupno: " + this.score.toString() + " poena";
        this.socket.emit("sendResWords", this.myRoomId, this.playerIdent, this.words);
    }
  }

  startSlovoteka(serverLetters){
    this.letters = serverLetters;
    this.isDisabled = false;
    this.zIndexStop = 1;
    this.zIndexConfirm = 2;
    this.timer = 60;
    this.gameStart = true;
    this.message = "Brzo! Sakupi što više reči za 60 sekundi!"
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
    if(this.word == ''  || this.words.includes(this.word) == true) return;
    this.gameService.checkWord(this.word).subscribe((resp)=>{
      if(resp['status'] == 1) {
        this.score += this.word.length / 2;
        this.words[this.words.length] = this.word;
        this.deleteWord();
        this.message = "Reč uneta!";
      } else{
        this.message = "Neispravna reč!";
      }
    });
  }

  finishCurrentGame(slovotekaData){
    if(this.playerIdent == 0) this.opponentWords = slovotekaData.redWords;
    else this.opponentWords = slovotekaData.blueWords;
    this.calculateScore(slovotekaData.blueWords, slovotekaData.redWords, this.currentPlayerIdent);
    const source = interval(1000);
    this.timer = 5;
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timerSubscription.unsubscribe();
        if(this.currentPlayerIdent == 1) {
          sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
          this.router.navigate(['../moj-broj-multi']);
        }
        else {
          this.currentPlayerIdent = 1;
          this.resetGame();
        }
      };
    });
  }

  resetGame(){
    this.opponentWords = [];
    this.words = [];
    this.gameStart = false;
    this.timer = 5;
    this.isDisabled = false;
    this.zIndexStop = 2;
    this.zIndexConfirm = 1;
    this.message = 'Zaustavi slova i započni igru!';
    this.word = "";
    this.wordNumsIndex = 0;
    this.wordNums = [];
    this.score = 0;
    this.socket.emit("playSlovoteka", this.gameInfo.roomId);
  }

  calculateScore(blueWords, redWords, advantageIdent){
    let blueScore = 0, redScore = 0;
    let longestWordLenBlue = 0, longestWordLenRed = 0, ident = -1, wordLen = 0;
    for(let i = 0;i < blueWords.length;i++) {
      wordLen = blueWords[i].length;
      blueScore += wordLen / 2;
      if(wordLen > longestWordLenBlue) longestWordLenBlue = wordLen;
    }
    for(let i = 0;i < redWords.length;i++) {
      wordLen = redWords[i].length;
      redScore += wordLen / 2;
      if(wordLen > longestWordLenRed) longestWordLenRed = wordLen;
    }
    if((longestWordLenBlue > longestWordLenRed) || (longestWordLenBlue == longestWordLenRed && advantageIdent == 0)) ident = 0;
    else ident = 1;
    this.gameStats.totalLetters[0] = blueScore * 2;
    this.gameStats.totalLetters[1] = redScore * 2;
    this.gameStats.wins = ident == 0 ? [1, 0] : [0, 1];
    this.gameStats.totalWords[0] = blueWords.length;
    this.gameStats.totalWords[1] = redWords.length;
    this.gameStats.longestWord[0] = longestWordLenBlue;
    this.gameStats.longestWord[1] = longestWordLenRed;
    if(ident == 0) blueScore += 6;
    else if(ident == 1) redScore += 6;
    this.gameInfo.bluePoints += blueScore;
    this.gameInfo.redPoints += redScore;
    if(this.playerIdent == 0){
      this.gameService.updateSlovotekaStats(this.gameStats).subscribe((resp)=>{
        if(resp) console.log('ok');
      });
    }
  }
}
