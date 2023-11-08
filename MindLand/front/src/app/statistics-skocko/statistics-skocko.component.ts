import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-skocko',
  templateUrl: './statistics-skocko.component.html',
  styleUrls: ['./statistics-skocko.component.css']
})
export class StatisticsSkockoComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getSkockoStats();
  }

  getSkockoStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
        this.statistic = stat;
        let p1, p2;
        let games = stat.skockoWin + stat.skockoLoss;
        if(stat.skockoCombos / games < 3.9) p1 = 95;
        else if(stat.skockoCombos / games < 4.9) p1 = 75;
        else if(stat.skockoCombos / games < 5.5) p1 = 50;
        else if(stat.skockoCombos / games < 5.8) p1 = 25;
        else p1 = 10;

        p2 = (stat.skockoWin / games) * 100;

        this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, #f2f2f2 ${p1}%)`;
        this.progressPercentage[1] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p2}%, #f2f2f2 ${p2}%)`;
      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../skocko']);
  }

}
