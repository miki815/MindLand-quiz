import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { GameService } from '../services/game.service';
import { Statistics } from '../models/statistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-ko-zna-zna',
  templateUrl: './statistics-ko-zna-zna.component.html',
  styleUrls: ['./statistics-ko-zna-zna.component.css']
})
export class StatisticsKoZnaZnaComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  player: User;
  statistic: Statistics;
  progressPercentage: Array<String> = [];

  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getPitanjaStats();
  }

  getPitanjaStats(){
    this.gameService.getSlovotekaStats(this.player.username).subscribe((stat: Statistics)=>{
      if(stat) {
        this.statistic = stat;
        let ukradiCnt = stat.pitanjaUkradiWin + stat.pitanjaUkradiLoss;
        let pitanjaCnt = stat.pitanjaTrue + stat.pitanjaFalse + stat.pitanjaDalje;
        let p1 = ((stat.pitanjaUkradiWin / ukradiCnt) * 100);
        let p21 = ((stat.pitanjaTrue / pitanjaCnt) * 100);
        let p22 =  ((stat.pitanjaFalse / pitanjaCnt) * 100);
        this.progressPercentage[0] = `linear-gradient(to right, #4CAF50, #4CAF50  ${p1}%, red ${p1}%)`;
        this.progressPercentage[1] = `linear-gradient(to right, #4CAF50, #4CAF50 ${p21}%, #f2f2f2 ${p21}%, #f2f2f2 ${p21 + p22}%, red ${p21 + p22}%)`;
      }
      else alert("Greska");
    })
  }

  exercise(){
    this.router.navigate(['../pitanja']);
  }


}
