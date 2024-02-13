import { Component, EventEmitter, Output } from '@angular/core';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent {
  receipes:Receipe[] = [
    new Receipe('A Test Receipe','This is a sample receipe','https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg'),
    new Receipe('Another Test Receipe','This is another sample receipe','https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg'),
    new Receipe('Not a Test Receipe','This is not a sample receipe','https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg')
  ];

  @Output() receipeWasSelected = new EventEmitter<Receipe>();

  onReceipeSelected(selectedReceipe:Receipe){
    this.receipeWasSelected.emit(selectedReceipe);
  }
}
