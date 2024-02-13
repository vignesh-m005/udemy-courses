import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Receipe } from '../../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent {
  @Input('receipe') receipe:Receipe;

  @Output()
  receipeSelected = new EventEmitter<void>();

  onSelected(){
    this.receipeSelected.emit();
  }

}
