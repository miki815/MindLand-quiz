import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password, "player").subscribe((user: User)=>{
      if(user) {
        sessionStorage.setItem("User", JSON.stringify(user));
        this.router.navigate(['/homepage']);
      }
      else this.message = "Loši kredencijali!";
    })
  }

}
