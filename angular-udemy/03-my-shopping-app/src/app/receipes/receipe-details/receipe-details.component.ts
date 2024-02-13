import { Component,Input } from '@angular/core';
import { Receipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-details',
  templateUrl: './receipe-details.component.html',
  styleUrls: ['./receipe-details.component.css']
})
export class ReceipeDetailsComponent {
  @Input() receipe:Receipe;
  
}
