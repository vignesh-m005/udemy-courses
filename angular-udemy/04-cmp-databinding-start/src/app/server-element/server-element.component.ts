import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit,OnChanges,DoCheck, AfterContentInit,
AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy {

  @Input("serverElement")
  element:{type:string,name:string,content:string};

  @Input() name:string;
  @ViewChild('heading',{static:true}) heading:ElementRef;
  @ContentChild('contentParagraph', {static:true}) contentParagraph:ElementRef;


  constructor() {
    console.log('Constructor called');
    
   }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges called');
    console.log(changes);
   }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text Content: '+this.heading.nativeElement.textContent);
    console.log('Text Content of paragraph: '+this.contentParagraph.nativeElement.textContent);
  }

  ngDoCheck(){
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
    console.log('Text Content of paragraph: '+this.contentParagraph.nativeElement.textContent);
    //console.log('Text Content: '+this.heading.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('Text Content: '+this.heading.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }

}
