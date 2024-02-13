import { Component } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  styles:[`
    .white-text{
      color:white;
    }
  `]
})
export class WarningComponent {
    display = false;
    clickTime:Date[] = [];

    displayDetails(){
      this.clickTime.push(new Date());
      this.display = true;
    }

    getColor(i:any){
      return i >= 4 ? "blue" : "white";
    }
}
