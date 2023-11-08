import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000'

  login(username, password, type){
    const data = {
      username: username,
      password: password,
      type: type
    }
    return this.http.post('http://localhost:4000/users/login', data);
  }

  register(player){
    const data = {
      firstname: player.firstname,
      lastname: player.lastname,
      username: player.username,
      password: player.password,
      email: player.email
    }
    return this.http.post('http://localhost:4000/users/register', data);
  }

  getBestUsers(count, username){
    const data = {
      count: count,
      username: username
    }
    return this.http.post('http://localhost:4000/users/getBestUsers', data);
  }

  resetPassword(email){
    const data = {email: email}
    return this.http.post(`${this.uri}/users/resetPassword`, data);
  }

  changeForgotPassword(email, password){
    const data = {email: email, password: password}
    return this.http.post(`${this.uri}/users/changeForgotPassword`, data);
  }

  tokenValidation(token){
    const data = {token: token}
    return this.http.post(`${this.uri}/users/tokenValidation`, data);
  }
}
