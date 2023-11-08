import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private router: Router) { }

  player: User;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
  }

  dodajPitanje(){
    this.router.navigate(['../admin-pitanja']);
  }

  dodajAsocijaciju(){
    this.router.navigate(['../admin-asocijacije']);
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
