import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-menu',
  templateUrl: './exercise-menu.component.html',
  styleUrls: ['./exercise-menu.component.css']
})
export class ExerciseMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  playGame(gameId){
    if(gameId == 1) this.router.navigate(['../my-number']);
    else if(gameId == 2) this.router.navigate(['../skocko']);
    else if(gameId == 3) this.router.navigate(['../korpa']);
    else if(gameId == 4) this.router.navigate(['../slovoteka']);
    else if(gameId == 5) this.router.navigate(['../pitanja']);
    else if(gameId == 6) this.router.navigate(['../asocijacije']);
  }
}
