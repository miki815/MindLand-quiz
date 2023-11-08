import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { User } from '../models/user';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-admin-dodaj-pitanje',
  templateUrl: './admin-dodaj-pitanje.component.html',
  styleUrls: ['./admin-dodaj-pitanje.component.css']
})
export class AdminDodajPitanjeComponent implements OnInit {

  constructor(private gameService: GameService) { }

  question: Question;
  admin: User;
  opcije: string[] = ['Opcija 1', 'Opcija 2', 'Opcija 3', 'Opcija 4'];
  izabranaOpcija: string;

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("User"));
    this.question = new Question();
  }

  dodajPitanje(){
    this.gameService.addQuestion(this.question).subscribe((resp)=>{
      if(resp) {
        alert("Pitanje uspešno ubačeno u bazu!")
      }
      else alert("Greska");
    })
  }

}
