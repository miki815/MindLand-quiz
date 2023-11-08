import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent implements OnInit {

  constructor(private userService: UserService) { }

  email: string;

  ngOnInit(): void {
  }

  promena_lozinke(){
    this.userService.resetPassword(this.email).subscribe(ob=>{
        if(ob['message']=='poruka poslata'){
          alert('Privremeni link za promenu lozinke je poslat na vasu email adresu. Link je vazeci narednih 30min.');
        } else{
          alert('Mejl ne postoji!');
        }
      })
  }
}
