import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createPassword } from '../schemaService/createPassword';
import { CreatePasswordService } from '../service/create-password.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  formCreatePassword : FormGroup
  validForm: boolean = false;
  token:string;
  message:string;
  alertBerhasil:boolean = false;
  alertError:boolean = false;

  createPasswordSchema :any = new createPassword('','');

  constructor(
    private router : Router,
    private createPasswordLogin : CreatePasswordService
  ) { }

  ngOnInit() {
    this.formCreatePassword = new FormGroup({
      'email' : new FormControl(),
      'password' : new FormControl(),
    })
  }

  onSubmit(){
    this.createPasswordSchema.email = this.formCreatePassword.get('email').value,
    this.createPasswordSchema.password = this.formCreatePassword.get('password').value

    this.createPasswordLogin.postGantiPassword(this.createPasswordSchema).subscribe((resp: any)=>{
      console.log(resp)

      if(resp === "Password Berhasil di simpan silahkan Login"){
        this.message = resp;
        this.alertBerhasil = true;
      }else{
        this.message = resp;
        this.alertError = true;
      }
    })
  }
}
