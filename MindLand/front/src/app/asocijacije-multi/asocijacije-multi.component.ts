import { Component, OnInit } from '@angular/core';
import { Association } from '../models/association';
import { GameService } from '../services/game.service';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asocijacije-multi',
  templateUrl: './asocijacije-multi.component.html',
  styleUrls: ['./asocijacije-multi.component.css']
})
export class AsocijacijeMultiComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket, private router: Router) { }

  association: Association;
  A: Array<String> = ["A1", "A2", "A3", "A4", ""];
  B: Array<String> = ["B1", "B2", "B3", "B4", ""];
  C: Array<String> = ["C1", "C2", "C3", "C4", ""];
  D: Array<String> = ["D1", "D2", "D3", "D4", ""];
  konacno: String = "";
  currentColumn: String = "";
  disableColumn: Array<boolean> = [true, true, true, true, true];
  foundClass: Array<String> = ["", "", "", "", ""];
  openFields: Array<number> = [0, 0, 0, 0];
  playerIdent: number;
  playerClass: String;
  timerSubscription: Subscription;
  timer: number = 22;
  myRoomId: string;
  gameCnt: number = 0;
  currentPlayerIdent: number = 0;
  fieldOpen: boolean = false;

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
    solved: Array<number>;
  } = {
    players: [null, null],
    solved: [0, 0]
  };

  ngOnInit(): void {
    this.gameInfo = JSON.parse(sessionStorage.getItem('game'));
    this.playerIdent = this.gameInfo.myIdent;
    this.myRoomId = this.gameInfo.roomId;
    this.gameStats.players[0] = this.gameInfo.bluePlayer;
    this.gameStats.players[1] = this.gameInfo.redPlayer;
this.gameInfo.bluePoints += 55.5;
this.gameInfo.redPoints += 30;


    this.socket.emit("playAssociation", this.gameInfo.roomId);

    this.socket.on("getAssociation", assocId => {
      console.log('asocijacija stigla!');
      this.getAssociationById(assocId);
    })

    this.socket.on("openField", (column, row) => {
      console.log('opening field');
      this.fieldOpen = true;
      this.openField(column, row);
    })

    this.socket.on("answerCheck", (column, guess, playerIdent) => {
      console.log('checking answer');
      this.guessAnswer(column, guess, playerIdent);
    })

    this.socket.on("changePlayer", () => {
      if(this.fieldOpen == false) this.openOneField();
      this.currentPlayerIdent = 1 - this.currentPlayerIdent;
      let moves = this.openFields[0] + this.openFields[1] + this.openFields[2] + this.openFields[3];
      if(moves < 16)
         this.fieldOpen = false;
      else this.openFields[0]++, moves++;
      if(moves == 20) this.endGame();
      else this.timer = 22;
    })

    this.socket.on("setPlayer", (ident) => {
      console.log('setting player');
      if(ident == 0) this.playerClass = 'field-found-blue';
      else if(ident == 1) this.playerClass = 'field-found-red';
      this.playerIdent = ident;
    })

    this.socket.on("additionalTime", () => {
      this.timer = 22;
    })
  }

  fieldClick(column, row){
    if(this.playerIdent != this.currentPlayerIdent) return;
    this.socket.emit("fieldClick", column, row);
  }

  answerSubmit(){
    if(this.playerIdent != this.currentPlayerIdent) return;
    let guess;
    if(this.currentColumn == "A") guess = this.A[4];
    else if(this.currentColumn == "B") guess = this.B[4];
    else if(this.currentColumn == "C") guess = this.C[4];
    else if(this.currentColumn == "D") guess = this.D[4];
    else if(this.currentColumn == "K") guess = this.konacno;
    this.socket.emit("answerSubmit", this.currentColumn, guess, this.playerIdent);
  }

  getAssociationById(id){
    this.gameService.getAssociationById(id).subscribe((assoc: Association)=>{
        if(assoc) {
          this.association = assoc;
          this.gameCnt++;
          this.startTimer();
        }
        else alert("Greska");
    })
  }

  skipMove(){
    this.timer = null;
    this.socket.emit("changePlayer", this.myRoomId);
  }

  openField(column, row){
    if(column == "A") this.A[row] = this.association.A[row], this.disableColumn[0] = false, this.openFields[0]++;
    else if(column == "B") this.B[row] = this.association.B[row], this.disableColumn[1] = false, this.openFields[1]++;
    else if(column == "C") this.C[row] = this.association.C[row], this.disableColumn[2] = false, this.openFields[2]++;
    else if(column == "D") this.D[row] = this.association.D[row], this.disableColumn[3] = false, this.openFields[3]++;
  }

  setColumn(column){
    if(column != "A" && this.disableColumn[0] == false) this.A[4] = "";
    if(column != "B" && this.disableColumn[1] == false) this.B[4] = "";
    if(column != "C" && this.disableColumn[2] == false) this.C[4] = "";
    if(column != "D" && this.disableColumn[3] == false) this.D[4] = "";
    if(column != "K" && this.disableColumn[4] == false) this.konacno = "";
    this.currentColumn = column;
  }

  guessAnswer(column, guess, playerId){
    this.currentColumn = column;
    let isCorrect = false;
    if(this.currentColumn == "A" && this.association.A[4].includes(guess)) {
      isCorrect = true;
      this.A[4] =  this.association.A[4][0];
      this.disableColumn[0] = true;
      for(let i = 0;i < 4; i++) this.A[i] = this.association.A[i];
      this.foundClass[0] = playerId == 0 ? 'field-found-blue' : 'field-found-red';
      this.disableColumn[4] = false;
      if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += (6 - this.openFields[0]);
      else this.gameInfo.redPoints += (6 - this.openFields[0]);
      this.openFields[0] = 4;
    }
    else if(this.currentColumn == "B" && this.association.B[4].includes(guess)) {
      isCorrect = true;
      this.B[4] =  this.association.B[4][0];
      this.disableColumn[1] = true;
      for(let i = 0;i < 4; i++) this.B[i] = this.association.B[i];
      this.foundClass[1] = playerId == 0 ? 'field-found-blue' : 'field-found-red';
      this.disableColumn[4] = false;
      if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += (6 - this.openFields[1]);
      else this.gameInfo.redPoints += (6 - this.openFields[1]);
      this.openFields[1] = 4;
    }
    else if(this.currentColumn == "C" && this.association.C[4].includes(guess)){
      isCorrect = true;
      this.C[4] =  this.association.C[4][0];
      this.disableColumn[2] = true;
      for(let i = 0;i < 4; i++) this.C[i] = this.association.C[i];
      this.foundClass[2] = playerId == 0 ? 'field-found-blue' : 'field-found-red';
      this.disableColumn[4] = false;
      if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += (6 - this.openFields[2]);
      else this.gameInfo.redPoints += (6 - this.openFields[2]);
      this.openFields[2] = 4;
    } 
    else if(this.currentColumn == "D" && this.association.D[4].includes(guess)) {
      isCorrect = true;
      this.D[4] =  this.association.D[4][0];
      this.disableColumn[3] = true;
      for(let i = 0;i < 4; i++) this.D[i] = this.association.D[i];
      this.foundClass[3] = playerId == 0 ? 'field-found-blue' : 'field-found-red';
      this.disableColumn[4] = false;
      if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += (6 - this.openFields[3]);
      else this.gameInfo.redPoints += (6 - this.openFields[3]);
      this.openFields[3] = 4;
    }
    else if(this.currentColumn == "K" && this.association.Konacno.includes(guess)) {
      isCorrect = true;
      this.konacno = this.association.Konacno[0];
      let points = this.calculatePoints();
      if(this.currentPlayerIdent == 0) this.gameInfo.bluePoints += points;
      else this.gameInfo.redPoints += points;
      for(let i = 0;i < 5; i++){
        this.A[i] = this.association.A[i];
        this.B[i] = this.association.B[i];
        this.C[i] = this.association.C[i];
        this.D[i] = this.association.D[i];
        this.disableColumn[i] = true;
        if(this.foundClass[i] == ""){
          this.gameStats.solved[playerId]++;
          this.foundClass[i] = playerId == 0 ? 'field-found-blue' : 'field-found-red';
        }
      }
      this.A[4] = this.association.A[4][0];
      this.B[4] = this.association.B[4][0];
      this.C[4] = this.association.C[4][0];
      this.D[4] = this.association.D[4][0];
      this.timerSubscription.unsubscribe();
      this.timer = 0;
      this.endGameTimer();
    }
    if(isCorrect == true && this.currentColumn != "K") this.gameStats.solved[playerId]++;
    if(isCorrect == true && this.currentColumn != "K" && this.playerIdent == this.currentPlayerIdent){
      this.socket.emit("correctAnswer", this.myRoomId);
    }
    else if(isCorrect == false) this.showGuess(column, guess);
    
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      if(this.timer != null) this.timer--;
      if (this.timer === 0) {
     //   this.fieldOpen = true;
        if(this.playerIdent == this.currentPlayerIdent) this.socket.emit("changePlayer", this.myRoomId);
      }
    });
  }

  calculatePoints(){
    let points = 5;
    if(this.A[4] != this.association.A[4][0]) points += (6 - this.openFields[0]);
    if(this.B[4] != this.association.B[4][0]) points += (6 - this.openFields[1]);
    if(this.C[4] != this.association.C[4][0]) points += (6 - this.openFields[2]);
    if(this.D[4] != this.association.D[4][0]) points += (6 - this.openFields[3]);
    return points;
  }

  endGame(){
    this.timerSubscription.unsubscribe();
    this.timer = 0;
    this.konacno = this.association.Konacno[0];
    for(let i = 0;i < 5; i++){
      this.A[i] = this.association.A[i];
      this.B[i] = this.association.B[i];
      this.C[i] = this.association.C[i];
      this.D[i] = this.association.D[i];
      this.disableColumn[i] = true;
      if(this.foundClass[i] == "") this.foundClass[i] = 'field-not-found';
    }
    this.A[4] = this.association.A[4][0];
    this.B[4] = this.association.B[4][0];
    this.C[4] = this.association.C[4][0];
    this.D[4] = this.association.D[4][0];
    this.endGameTimer();
  }

  showGuess(col, guess){
    this.timer = null;
    if(col == "A") this.A[4] = guess;
    else if(col == "B") this.B[4] = guess;
    else if(col == "C") this.C[4] = guess;
    else if(col == "D") this.D[4] = guess;
    else if(col == "K") this.konacno = guess;
    setTimeout(() => {
      if(col == "A") this.A[4] = "";
      else if(col == "B") this.B[4] = "";
      else if(col == "C") this.C[4] = "";
      else if(col == "D") this.D[4] = "";
      else if(col == "K") this.konacno = "";
      if(this.playerIdent == this.currentPlayerIdent && this.fieldOpen == true) 
        this.socket.emit("changePlayer", this.myRoomId);
    }, 1000);
  }


  endGameTimer(){
    const source = interval(1000);
    this.timer = 5;
    if(this.playerIdent == 0){
      this.gameService.updateAsocijacijeStats(this.gameStats).subscribe((resp)=>{
        if(resp) console.log('ok');
      });
    } 
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        if(this.gameCnt == 1) {
          this.gameStats.solved = [0, 0];
          this.currentPlayerIdent = 1;
          this.A = ["A1", "A2", "A3", "A4", ""];
          this.B = ["B1", "B2", "B3", "B4", ""];
          this.C = ["C1", "C2", "C3", "C4", ""];
          this.D = ["D1", "D2", "D3", "D4", ""];
          this.konacno = "";
          this.disableColumn = [true, true, true, true, true];
          this.foundClass = ["", "", "", "", ""];
          this.openFields = [0, 0, 0, 0];
          this.timerSubscription.unsubscribe();
          this.timer = 22;
          this.socket.emit("playAssociation", this.gameInfo.roomId);
          this.fieldOpen = false;
        }
        else {
          sessionStorage.setItem('game', JSON.stringify(this.gameInfo));
          this.router.navigate(['../finish-game']);
        }
      };
    });
  }

  openOneField(){
    this.fieldOpen = true;
    for(let i = 0;i < 5; i++) if(this.A[i].length == 2) {this.openField("A", i); return;}
    for(let i = 0;i < 5; i++) if(this.B[i].length == 2) {this.openField("B", i); return;}
    for(let i = 0;i < 5; i++) if(this.C[i].length == 2) {this.openField("C", i); return;}
    for(let i = 0;i < 5; i++) if(this.D[i].length == 2) {this.openField("D", i); return;}
  }
}
