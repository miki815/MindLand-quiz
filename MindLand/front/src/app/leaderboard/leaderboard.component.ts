import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  bestUsers: Array<User>;
  player: User;
  myRang: number;


  ngOnInit(): void {
    this.player = JSON.parse(sessionStorage.getItem("User"));
    this.getBestUsers();
  }

  getBestUsers(){
    this.userService.getBestUsers(5, this.player.username).subscribe((res)=>{
      if(res) this.bestUsers = res['best'], this.myRang = res['user-rang'];
      else alert("Greska");
    })
  }

}
