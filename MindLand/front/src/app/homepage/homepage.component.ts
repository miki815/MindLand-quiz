import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  player: User;
  animals: Array<string> = ["Leptir", "Vrabac", "Guster", "Lasta", "Kornjaca", "Zec", "Srna", "Lisica", 
  "Zmija", "Tigar", "Vuk", "Soko", "Medved", "Ajkula", "Zirafa", "Lav"];
  animalsImg: Array<string> = ["../../assets/leptir.jpg", "../../assets/vrabac.jpg", "../../assets/guster.jpg",
  "../../assets/lasta.jpg", "../../assets/kornjaca.jpg", "../../assets/zec.jpg", "../../assets/srna.jpg",
  "../../assets/lisica.jpg", "../../assets/zmija.jpg", "../../assets/tigar.jpg", "../../assets/vuk.jpg",
  "../../assets/soko.jpg", "../../assets/medved.jpg", "../../assets/ajkula.jpg", "../../assets/zirafa.jpg",
  "../../assets/lav.jpg"];
  animal: string;
  animalImg: string;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.animal = this.animals[Math.round(this.player.rating / 100)];
    this.animalImg = this.animalsImg[Math.round(this.player.rating / 100)];
    if(this.player.rating > 1500) this.animal = "Lav", this.animalImg =  "../../assets/lav.jpg";
  }

  exercise(){
    this.router.navigate(['../exercise']);
  }

  startGame(){
    this.router.navigate(['../start-game']);
  }

  showLeaderboard(){
    this.router.navigate(['../rang-lista']);
  }

  showStats(){
    this.router.navigate(['../stats-global']);
  }

  signOut(){
    sessionStorage.removeItem("User");
    this.router.navigate(['../']);
  }
}
