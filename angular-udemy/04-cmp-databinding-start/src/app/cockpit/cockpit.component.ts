import { Component, EventEmitter, Input, OnInit, Output, ViewChild,ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor() {
   }

   
  ngOnInit(): void {
   
  }

  @Output()
  serverCreated= new EventEmitter<{serverName:string, serverContent:string}>;

  @Output()
  blueprintCreated = new EventEmitter<{serverName:string, serverContent:string}>;

  newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput', {static:true}) newServerContent:ElementRef;

  onAddServer(serverName:HTMLInputElement) {
    console.log(this.newServerContent.nativeElement.value);
    this.newServerName=serverName.value
    this.serverCreated.emit({
        serverName:this.newServerName,
        serverContent:this.newServerContent.nativeElement.value
      });
  }

  onAddBlueprint(serverName:HTMLInputElement) {
    this.newServerName=serverName.value;
    this.blueprintCreated.emit({
      serverName:this.newServerName,
      serverContent:this.newServerContent.nativeElement.value
    });
  }
  
}
