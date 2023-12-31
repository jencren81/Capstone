import { Component } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UserService } from '../viewcart/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msg:string="";
    constructor(
      public loginService:LoginService, 
      public router:Router, 
      private userService: UserService){

    }
  loginRef = new FormGroup({
    emailid:new FormControl(),
    password:new FormControl(),
    typeofuser:new FormControl()
  });

signIn(): void{
  console.log("event fired")
  let loginData = this.loginRef.value;
  console.log(loginData);
  this.loginService.signIn(loginData).subscribe({
    next:(result:any)=>{
      if(result=="Admin login successful"){
        this.router.navigate(["adminhome"]);
      }else if(result=="Customer login successful"){
        sessionStorage.setItem("emailid",loginData.emailid);
        this.userService.setEmailid(loginData.emailid);
        this.router.navigate(["customerhome"]);
      }else{
        this.msg=result;
      }
      
    },
    error:(error:any)=>{
      console.log(error)
    },
    complete:()=> {
      console.log("complete!")
    }
  })
  this.loginService.signUp;
  this.loginRef.reset();
} 


}
