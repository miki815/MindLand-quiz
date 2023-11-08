import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {}

  getQuestion(){
    return this.http.get('http://localhost:4000/game/getQuestion');
  }

  getQuestionById(id){
    return this.http.post('http://localhost:4000/game/getQuestionById' , {id: id});
  }

  getAssociation(){
    return this.http.get('http://localhost:4000/game/getAssociation');
  }

  getAssociationById(id){
    return this.http.post('http://localhost:4000/game/getAssociationById', {id: id});
  }

  getSlovotekaStats(username){
    return this.http.post('http://localhost:4000/game/getSlovotekaStats', {username: username});
  }

  updateKorpaStats(winUser, lossUser){
    return this.http.post('http://localhost:4000/game/updateKorpaStats', {winUser: winUser, lossUser: lossUser});
  }

  updateSkockoStats(username, found, combos){
    return this.http.post('http://localhost:4000/game/updateSkockoStats', {username: username, found: found, combos: combos});
  }

  updateMojBrojStats(blueUser, redUser, gameData, winner){
    let data = {
      blueUser: blueUser,
      redUser: redUser,
      gameData: gameData,
      winner: winner
    }
    return this.http.post('http://localhost:4000/game/updateMojBrojStats', data);
  }

  updatePitanjaStats(pitanjaStats){
    let data = {pitanjaStats: pitanjaStats}
    return this.http.post('http://localhost:4000/game/updatePitanjaStats', data);
  }

  updateAsocijacijeStats(asocStats){
    let data = {asocStats: asocStats}
    return this.http.post('http://localhost:4000/game/updateAsocijacijeStats', data);
  }

  updateSlovotekaStats(slovotekaStats){
    let data = {slovotekaStats: slovotekaStats}
    return this.http.post('http://localhost:4000/game/updateSlovotekaStats', data);
  }

  addAssociation(assoc){
    let data = {assoc: assoc}
    return this.http.post('http://localhost:4000/game/addAssociation', data);
  }

  addQuestion(quest){
    let data = {quest: quest}
    return this.http.post('http://localhost:4000/game/addQuestion', data);
  }

  checkWord(word){
    let data = {word: word}
    return this.http.post('http://localhost:4000/game/checkWord', data);
  }

  updateStats(username, rating, win){
    let data = {username: username, rating: rating, win: win}
    return this.http.post('http://localhost:4000/game/updateGameStats', data);
  }
  
}
