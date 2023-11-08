import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-slovoteka',
  templateUrl: './statistics-slovoteka.component.html',
  styleUrls: ['./statistics-slovoteka.component.css']
})
export class StatisticsSlovotekaComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];
  avgLongest: string;
  avgTotalW: string;
  avgTotalL: string;

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getSlovotekaStats();
  }

  getSlovotekaStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
      this.statistic = stat;
      console.log("stat");
      let p1, p2, p3, p4;
      let games = stat.winSlovoteka + stat.lossSlovoteka;
      if(stat.longestWord / games > 11) p1 = 95;
      else if(stat.longestWord / games > 9) p1 = 75;
      else if(stat.longestWord / games > 7) p1 = 50;
      else if(stat.longestWord / games > 4) p1 = 25;
      else p1 = 10;

      if(stat.totalWords / games > 15) p2 = 100;
      else if(stat.totalWords / games > 12) p2 = 90;
      else if(stat.totalWords / games > 9) p2 = 75;  
      else if(stat.totalWords / games > 6) p2 = 50;  
      else if(stat.totalWords / games > 3) p2 = 25;  
      else p2 = 10;  

      if(stat.totalLetters / games > 100) p3 = 100;
      else p3 = stat.totalLetters / games;

      p4 = (stat.winSlovoteka / games) * 100;
      this.avgLongest = (this.statistic.longestWord / (this.statistic.winSlovoteka + this.statistic.lossSlovoteka)).toFixed(2);
      this.avgTotalW = (this.statistic.totalWords / (this.statistic.winSlovoteka + this.statistic.lossSlovoteka)).toFixed(2);
      this.avgTotalL = (this.statistic.totalLetters / (this.statistic.winSlovoteka + this.statistic.lossSlovoteka)).toFixed(2);

      this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, #f2f2f2 ${p1}%)`;
      this.progressPercentage[1] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p2}%, #f2f2f2 ${p2}%)`;
      this.progressPercentage[2] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p3}%, #f2f2f2 ${p3}%)`;
      this.progressPercentage[3] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p4}%, #f2f2f2 ${p4}%)`;

      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../slovoteka']);
  }

}
