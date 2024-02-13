import { Directive,Renderer2,OnInit,ElementRef,HostListener,HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  @Input() defaultColor: string = 'white';
  @Input() highlightColor: string = 'skyblue';
  @HostBinding('style.backgroundColor') backgroundColor:string = this.defaultColor;

  constructor(private elementRef:ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','orange')
  }

  @HostListener('mouseenter') mouseOver(eventData:Event){
    //this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','orange');
    this.backgroundColor= this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData:Event){
    //this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','white');
    this.backgroundColor=this.defaultColor;
  }

}
