import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { User } from '../models/user';
import { Association } from '../models/association';

@Component({
  selector: 'app-admin-dodaj-asocijaciju',
  templateUrl: './admin-dodaj-asocijaciju.component.html',
  styleUrls: ['./admin-dodaj-asocijaciju.component.css']
})
export class AdminDodajAsocijacijuComponent implements OnInit {

  constructor(private gameService: GameService) { }

  A: Array<string> = ["", "", "", "", ""];
  B: Array<string> = ["", "", "", "", ""];
  C: Array<string> = ["", "", "", "", ""];
  D: Array<string> = ["", "", "", "", ""];
  konacno: string = "";
  admin: User;

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("User"));
  }

  dodajAsocijaciju(){
    let Aresenja = this.A[4].split(",");
    let Bresenja = this.B[4].split(",");
    let Cresenja = this.C[4].split(",");
    let Dresenja = this.D[4].split(",");
    let konacnoResenja = this.konacno.split(",");
    let association = new Association();
    association.A = [this.A[0], this.A[1], this.A[2], this.A[3], Aresenja];
    association.B = [this.B[0], this.B[1], this.B[2], this.B[3], Bresenja];
    association.C = [this.C[0], this.C[1], this.C[2], this.C[3], Cresenja];
    association.D = [this.D[0], this.D[1], this.D[2], this.D[3], Dresenja];
    association.Konacno = konacnoResenja;

    this.gameService.addAssociation(association).subscribe((resp)=>{
      if(resp) {
        alert("Asocijacija uspešno ubačena u bazu!")
      }
      else alert("Greska");
    })
  }
}
