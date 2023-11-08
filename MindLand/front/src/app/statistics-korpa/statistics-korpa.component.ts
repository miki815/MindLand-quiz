import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-korpa',
  templateUrl: './statistics-korpa.component.html',
  styleUrls: ['./statistics-korpa.component.css']
})
export class StatisticsKorpaComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getKorpaStats();
  }

  getKorpaStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
        this.statistic = stat;
        let p1;
        let games = stat.korpaWin + stat.korpaLoss;
        p1 = (stat.korpaWin / games) * 100;
        this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, #f2f2f2 ${p1}%)`;
      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../korpa']);
  }

}
