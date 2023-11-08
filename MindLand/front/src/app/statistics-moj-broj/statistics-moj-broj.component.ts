import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-moj-broj',
  templateUrl: './statistics-moj-broj.component.html',
  styleUrls: ['./statistics-moj-broj.component.css']
})
export class StatisticsMojBrojComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];
  avgDigit: string;
  avgDistance: string;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getMojBrojStats();
  }

  getMojBrojStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
        this.statistic = stat;
        let p1, p2, p3;
        let games = stat.winMojBroj + stat.lossMojBroj;
        if(stat.distance == 0) p1 = 100;
        else if(stat.distance / games < 1) p1 = 95;
        else if(stat.distance / games < 3) p1 = 75;
        else if(stat.distance / games < 5) p1 = 50;
        else if(stat.distance / games < 8) p1 = 25;
        else p1 = 10;
    

        if(stat.digitCnt / games < 7) p2 = 100;
        else if(stat.digitCnt / games < 10) p2 = 80;
        else if(stat.digitCnt / games < 13) p2 = 60;  
        else if(stat.digitCnt / games < 16) p2 = 40;  
        else if(stat.digitCnt / games < 20) p2 = 20;  
        else p2 = 10;  

        p3 = (stat.winMojBroj / games) * 100;
        this.avgDigit = (this.statistic.digitCnt / (this.statistic.winMojBroj + this.statistic.lossMojBroj)).toFixed(2);
        this.avgDistance = (this.statistic.distance / (this.statistic.winMojBroj + this.statistic.lossMojBroj)).toFixed(2);
 
        this.progressPercentage[1] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, #f2f2f2 ${p1}%)`;
        this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p2}%, #f2f2f2 ${p2}%)`;
        this.progressPercentage[2] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p3}%, #f2f2f2 ${p3}%)`;

      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../my-number']);
  }
}
