import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-pentiks',
  templateUrl: './pentiks.component.html',
  styleUrls: ['./pentiks.component.css']
})
export class PentiksComponent implements OnInit {

  
  ngOnInit(): void {

  }
  rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  columns: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  occupiedSquare: [number, number] = null;

  isSquareOccupied(row: number, column: number): boolean {
    return this.occupiedSquare !== null && this.occupiedSquare[0] === row && this.occupiedSquare[1] === column;
  }

  dropSquare(event: CdkDragDrop<any[]>, row: number, column: number): void {
    if (event.previousContainer === event.container) {
      return;
    }
    
    this.occupiedSquare = [row, column];
    console.log("TEST")
  }

  
}
