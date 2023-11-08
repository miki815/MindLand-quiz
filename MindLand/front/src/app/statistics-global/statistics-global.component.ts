import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-statistics-global',
  templateUrl: './statistics-global.component.html',
  styleUrls: ['./statistics-global.component.css']
})
export class StatisticsGlobalComponent implements OnInit {

  constructor(private router: Router) { }

  player: User;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
  }

  showStats(gameId){
    if(gameId == 1) this.router.navigate(['../stats-moj-broj']);
    else if(gameId == 2) this.router.navigate(['../stats-skocko']);
    else if(gameId == 3) this.router.navigate(['../stats-korpa']);
    else if(gameId == 4) this.router.navigate(['../stats-slovoteka']);
    else if(gameId == 5) this.router.navigate(['../stats-ko-zna-zna']);
    else if(gameId == 6) this.router.navigate(['../stats-asocijacije']);
  }
}
