import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { gantiPassword } from '../schemaService/gantiPassword';
import { GantiPasswordService } from '../service/ganti-password.service';

@Component({
  selector: 'app-ganti-password',
  templateUrl: './ganti-password.component.html',
  styleUrls: ['./ganti-password.component.css']
})
export class GantiPasswordComponent implements OnInit {

  formPassword: FormGroup
  validForm: boolean = false;
  token:string;
  message:string;
  alertBerhasil:boolean = false;
  alertError:boolean = false;
  konfirmasi:boolean = false

  gantiPasswordSchema:any = new gantiPassword('','','');

  constructor(
    private router : Router,
    private gantiPasswordPost : GantiPasswordService

  ) { }

  ngOnInit() {

    this.token = localStorage.getItem("token");

    this.formPassword = new FormGroup({
      'passwordLama' : new FormControl(),
      'passwordBaru' : new FormControl(),
      'cekPassword' : new FormControl(),
      'token' : new FormControl(),
    })
  }

//   passwordMatchValidator(g: FormGroup) {
//     return g.get('passwordBaru').value === g.get('cekPassword').value
//        ? null : {'mismatch': true};
//  }

  onSubmit(){

    if(this.formPassword.get('passwordBaru').value === this.formPassword.get('cekPassword').value){
      this.gantiPasswordSchema.passwrodLama = this.formPassword.get('passwordLama').value,
      this.gantiPasswordSchema.passwrodBaru = this.formPassword.get('passwordBaru').value,
      this.gantiPasswordSchema.token = this.token;

      this.gantiPasswordPost.postGantiPassword(this.gantiPasswordSchema).subscribe((resp: any)=>{
        if(resp === "Berhasil Ganti Password"){
          this.message = resp;
          this.alertBerhasil = true;
        }else{
          this.message = resp;
          this.alertError = true;
        }
      })
    }else{
      this.konfirmasi = true;
    }


  }
}
