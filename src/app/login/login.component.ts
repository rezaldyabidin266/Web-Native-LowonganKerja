import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../schemaService/login';
import { LoginService } from '../service/login.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;
  loginSchema = new login(null,null,'','','');
  hide = true;
  validForm = false;
  errorMessage :any = null;
  errorLogin = false;
  createPassword = false

  constructor(
    private http: HttpClient,
    private loginService : LoginService,
    private router : Router
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'idPelamar' : new FormControl(),
      'idHeaderJawaban' : new FormControl(),
      'email' : new FormControl(),
      'noTlp' : new FormControl(),
      'password' : new FormControl(),
    })
  }

  onSubmit(value: any){
    this.loginSchema.idPelamar = 0,
    this.loginSchema.idHeaderJawaban = 0,
    this.loginSchema.email = this.formLogin.get('email').value,
    this.loginSchema.noTlp = String(null),
    this.loginSchema.password = this.formLogin.get('password').value
    this.loginService.postLogin(this.loginSchema).subscribe((resp :any ) =>{
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
          localStorage.setItem('token',resp.token)
        });
    },(error: HttpErrorResponse) => {
      if(error.status === 403 ){
        console.log(error)
        this.errorMessage = error.error;
        this.createPassword = true
        this.errorLogin = true;
      }else{
        this.errorLogin = true;
        this.errorMessage = error.error.message;
      }
     
    })

  }

}
