import { Component, OnInit } from '@angular/core';
import { Association } from '../models/association';
import { GameService } from '../services/game.service';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-asocijacije',
  templateUrl: './asocijacije.component.html',
  styleUrls: ['./asocijacije.component.css']
})
export class AsocijacijeComponent implements OnInit {

  constructor(private gameService: GameService, private socket: Socket) { }

  association: Association;
  A: Array<string> = ["A1", "A2", "A3", "A4", ""];
  B: Array<string> = ["B1", "B2", "B3", "B4", ""];
  C: Array<string> = ["C1", "C2", "C3", "C4", ""];
  D: Array<string> = ["D1", "D2", "D3", "D4", ""];
  konacno: string = "";
  currentColumn: String = "";
  disableColumn: Array<boolean> = [true, true, true, true, true];
  foundClass: Array<String> = ["", "", "", "", ""];


  ngOnInit(): void {
    this.getAssociation();
    this.socket.emit('test', 1);
  }

  getAssociation(){
    this.gameService.getAssociation().subscribe((ass: Association)=>{
        if(ass) {
          this.association = ass;
        }
        else alert("Greska");
    })
  }

  openField(column, row){
    if(column == "A") this.A[row] = this.association.A[row], this.disableColumn[0] = false;
    else if(column == "B") this.B[row] = this.association.B[row], this.disableColumn[1] = false;
    else if(column == "C") this.C[row] = this.association.C[row], this.disableColumn[2] = false;
    else if(column == "D") this.D[row] = this.association.D[row], this.disableColumn[3] = false;
  }

  setColumn(column){
    if(column != "A" && this.disableColumn[0] == false) this.A[4] = "";
    if(column != "B" && this.disableColumn[1] == false) this.B[4] = "";
    if(column != "C" && this.disableColumn[2] == false) this.C[4] = "";
    if(column != "D" && this.disableColumn[3] == false) this.D[4] = "";
    if(column != "K" && this.disableColumn[4] == false) this.konacno = "";
    this.currentColumn = column;
  }

  guessAnswer(){
    if(this.currentColumn == "A" && this.association.A[4].includes(this.A[4])) {
      this.disableColumn[0] = true;
      this.A[4] = this.association.A[4][0];
      for(let i = 0;i < 4; i++) this.A[i] = this.association.A[i];
      this.foundClass[0] = "field-found";
      this.disableColumn[4] = false;
    }
    else if(this.currentColumn == "B" && this.association.B[4].includes(this.B[4])) {
      this.disableColumn[1] = true;
      this.B[4] = this.association.B[4][0];
      for(let i = 0;i < 4; i++) this.B[i] = this.association.B[i];
      this.foundClass[1] = "field-found";
      this.disableColumn[4] = false;
    }
    else if(this.currentColumn == "C" && this.association.C[4].includes(this.C[4])){
      this.disableColumn[2] = true;
      this.C[4] = this.association.C[4][0];
      for(let i = 0;i < 4; i++) this.C[i] = this.association.C[i];
      this.foundClass[2] = "field-found";
      this.disableColumn[4] = false;
    } 
    else if(this.currentColumn == "D" && this.association.D[4].includes(this.D[4])) {
      this.disableColumn[3] = true;
      this.D[4] = this.association.D[4][0];
      for(let i = 0;i < 4; i++) this.D[i] = this.association.D[i];
      this.foundClass[3] = "field-found";
      this.disableColumn[4] = false;
    }
    else if(this.currentColumn == "K" && this.association.Konacno.includes(this.konacno)) {
      for(let i = 0;i < 5; i++){
        this.A[i] = this.association.A[i];
        this.B[i] = this.association.B[i];
        this.C[i] = this.association.C[i];
        this.D[i] = this.association.D[i];
        this.disableColumn[i] = true;
        this.foundClass[i] = "field-found";
      }
      this.A[4] = this.association.A[4][0];
      this.B[4] = this.association.B[4][0];
      this.C[4] = this.association.C[4][0];
      this.D[4] = this.association.D[4][0];
    }
  }
}
