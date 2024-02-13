import { Component } from '@angular/core';

@Component({
  //selector: 'app-servers',
  //selector: '[app-servers]',
  selector: '.app-servers',
  // template: `<app-server></app-server>
  // <br><br>
  // <app-server></app-server>` ,
  templateUrl : './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
    allowNewServer = false;
    serverCreationStatus = "No server created";
    serverName = '';
    serverCreated = false;
    servers = ['Testserver', 'Testserver 2']
    constructor(){
      setTimeout(() => {
        this.allowNewServer = true;
      },1000);
    }

    onCreateServer(){
        this.serverCreated = true;
        this.servers.push(this.serverName);
        this.serverCreationStatus = "Server is created!!! Name is: " + this.serverName; 
    }

    onUpdateServerName(event:any){
      this.serverName = (<HTMLInputElement>event.target).value;
    }
}
