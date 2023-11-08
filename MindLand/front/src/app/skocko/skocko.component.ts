import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-skocko',
  templateUrl: './skocko.component.html',
  styleUrls: ['./skocko.component.css']
})
export class SkockoComponent implements OnInit {

  constructor() { }

  tableIcons: Array<Array<string>> = new Array(6);
  combination: Array<number> = new Array(4);
  combinationIcons: Array<string> = new Array(4);
  currentCombination: Array<number> = new Array(4); 
  test: string = '';
  currentRow: number = 0;
  currentColumn: number = 0;
  btnDisabled: boolean = false;
  message: string = 'Razbij šifru!'

  ngOnInit(): void {
    for(let i = 0;i < 6;i++) this.tableIcons[i] = new Array(8);
    for(let i = 0; i < 4; i++) this.combination[i] = (Math.floor(Math.random() * 6)), this.currentCombination[i] = -1;
  }

  addSymbol(name, ident){
    for(let i = 0;i < 4; i++){
      if(this.currentCombination[i] == -1){
        this.tableIcons[this.currentRow][i] = name;
        this.currentCombination[i] = ident;
        return;
      }
    }
  }

  deleteSymbol(row, col){
    if(this.currentRow != row) return;
    this.currentCombination[col] = -1;
    this.tableIcons[row][col] = '';
  }

  revealCombination(){
    for(let i = 0; i < 4; i++) {
      if(this.combination[i] == 0) this.combinationIcons[i] = 'fas fa-ice-cream ice-cream-icon';
      else if(this.combination[i] == 1) this.combinationIcons[i] = 'fas fa-heart heart-icon';
      else if(this.combination[i] == 2) this.combinationIcons[i] = 'fas fa-book book-icon';
      else if(this.combination[i] == 3) this.combinationIcons[i] = 'fas fa-tint tint-icon';
      else if(this.combination[i] == 4) this.combinationIcons[i] = 'fas fa-star star-icon';
      else if(this.combination[i] == 5) this.combinationIcons[i] = 'fas fa-gem gem-icon';
    }
  }

  checkGuess(){
    for(let i = 0; i < 4; i++) if(this.currentCombination[i] == -1) return;
    let found = [-1,-1,-1,-1];
    let cntGreen = 0, cntYellow = 0;
    for(let i = 0; i < 4; i++) {
      if(this.currentCombination[i] == this.combination[i]) found[i] = i, cntGreen++; // right place
      if(i == 3 && found[0] == 0 && found[1] == 1 && found[2] == 2 && found[3] == 3){
        this.message = 'Čestitamo! Razbili ste šifru! Igra je završena!';
        this.revealCombination();
        this.btnDisabled = true;
        let cursor = 4;
        for(let i = 0;i < 4; i++) this.tableIcons[this.currentRow][cursor++] = 'right-position';
        this.currentRow = -1;
        return;
      }
    }
    for(let i = 0; i < 4; i++) {
      for(let j = 0;j < 4;j++){
        if(this.currentCombination[i] == this.combination[i]) break;
        if(this.currentCombination[i] == this.combination[j] && found.includes(j) == false) {
          found[i] = j; // found but not at right place
          cntYellow++;
          break;
        }
      }   
    }
    let cnt = 4;
    for(let i = 0;i < cntGreen; i++) this.tableIcons[this.currentRow][cnt++] = 'right-position';
    for(let i = 0;i < cntYellow; i++) this.tableIcons[this.currentRow][cnt++] = 'wrong-position';
    this.currentRow++;
    this.currentColumn = 0;
    for(let i = 0;i < 4; i++) this.currentCombination[i] = -1;
    if(this.currentRow == 6){
      this.message = "Žao nam je! Niste uspeli da provalite tajnu šifru!";
      this.revealCombination();
    }
  }
}
