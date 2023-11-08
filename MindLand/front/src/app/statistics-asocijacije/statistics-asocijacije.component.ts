import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-asocijacije',
  templateUrl: './statistics-asocijacije.component.html',
  styleUrls: ['./statistics-asocijacije.component.css']
})
export class StatisticsAsocijacijeComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getAsocijacijeStats();
  }

  getAsocijacijeStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
        let games = 0;
        for(let i = 0;i < 6; i++) games += stat.asocijacijeStats[i];
        this.statistic = stat;
        let p0, p1, p2, p3, p4, p5;
        p0 = (stat.asocijacijeStats[0] / games) * 100;
        p1 = (stat.asocijacijeStats[1] / games) * 100;
        p2 = (stat.asocijacijeStats[2] / games) * 100;
        p3 = (stat.asocijacijeStats[3] / games) * 100;
        p4 = (stat.asocijacijeStats[4] / games) * 100;
        p5 = (stat.asocijacijeStats[5] / games) * 100;
        this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p0}%, #f2f2f2 ${p0}%)`;
        this.progressPercentage[1] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, #f2f2f2 ${p1}%)`;
        this.progressPercentage[2] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p2}%, #f2f2f2 ${p2}%)`;
        this.progressPercentage[3] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p3}%, #f2f2f2 ${p3}%)`;
        this.progressPercentage[4] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p4}%, #f2f2f2 ${p4}%)`;
        this.progressPercentage[5] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p5}%, #f2f2f2 ${p5}%)`;
      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../asocijacije']);
  }


}
