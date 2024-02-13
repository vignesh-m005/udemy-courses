import { Component } from "@angular/core";

@Component({
    selector : 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']
})
export class SuccessComponent{
    username = '';
    isUservalid = this.username == '' ? false : true;
    
    onUpdateUser(event:any){
        this.username= (<HTMLInputElement>event.target).value;
    }

    isUserValid(){
        return this.username == '' ? false : true;
    }

    updateUserName(){
        this.username = '';
    }
}