import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';
  message: string = '';
  newPlayer: User;

  ngOnInit(): void {
  }

  register(){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if(this.firstname == '' || this.lastname == '' || this.password == '' || this.password2 == '' ||
       this.email == '' || this.username == '')
      this.message = "Sva polja moraju biti popunjena!";
    else if(this.password != this.password2)
      this.message = "Lozinke se ne poklapaju!";
    else if(passwordRegex.test(this.password) == false)
      this.message = "Lozinka neispravna!";
    else if(emailRegex.test(this.email) == false)
      this.message = "Email adresa nije validna!";
    else{
      this.newPlayer = new User();
      this.newPlayer.firstname = this.firstname;
      this.newPlayer.lastname = this.lastname;
      this.newPlayer.username = this.username;
      this.newPlayer.password = this.password;
      this.newPlayer.email = this.email;

      this.userService.register(this.newPlayer).subscribe((msg)=>{
        if(msg){
          if(msg['message'] == -1) this.message = "Nalog sa istom Email adresom vec postoji!";
          else if(msg['message'] == -2) this.message = "Korisnicko ime zauzeto!";
          else{
            this.message = '';
            alert("Hvala sto ste se registrovali na Mindland!");
            this.router.navigate(['../']);
          }
        }
      })
    }
    

  }

}
