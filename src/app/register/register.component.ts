import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from '../schemaService/register';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formDaftar : FormGroup;
  validForm = false;
  disableTombol = false;
  ipAddress :  string;
  formRegisterSchema = new register('','','','','','','',null,'');

  validRegister = false;
  alertRegister:any;

  constructor(
    private router : Router,
    private postRegister : RegisterService) { }

  ngOnInit() {

    this.formDaftar = new FormGroup({
      'nama': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'alamat': new FormControl(null,[Validators.required]),
      'tempatLahir': new FormControl(null,[Validators.required]),
      'tglLahir': new FormControl(null,[Validators.required]),
      'noTlp': new FormControl(null,[Validators.required]),
      'note' : new FormControl(null,[Validators.required]),
      'lowonganId' : new FormControl(0),
      'password' : new FormControl(null,[Validators.required])
    });
  }

  onSubmit(){
     //Format Date
     let DateFormat = new DatePipe('en-US').transform(this.formDaftar.get('tglLahir').value,'dd-MM-yyyy');
     let Ip = this.ipAddress
     let myBrowser = this.myBrowser();
     
     this.formRegisterSchema.email = this.formDaftar.get('email').value; 
     this.formRegisterSchema.noTlp = String(this.formDaftar.get('noTlp').value); 
     this.formRegisterSchema.nama = this.formDaftar.get('nama').value; 
     this.formRegisterSchema.alamat = this.formDaftar.get('alamat').value; 
     this.formRegisterSchema.tempatLahir = this.formDaftar.get('tempatLahir').value; 
     this.formRegisterSchema.tglLahir = this.formDaftar.get('tglLahir').value; 
     this.formRegisterSchema.note = String( Ip + ' ' + myBrowser); 
     this.formRegisterSchema.lowonganId = 0; 
     this.formRegisterSchema.password = this.formDaftar.get('password').value;
     console.log(this.formRegisterSchema)

     this.postRegister.PostRegister(this.formRegisterSchema).subscribe(
       (event : HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
             console.log('Request has been made!');
            this.disableTombol = true;
            break;
          case HttpEventType.ResponseHeader:
             console.log('Response header has been received!');
            this.disableTombol = true;
            break;
          case HttpEventType.UploadProgress:
            this.disableTombol = true;
            break;
          case HttpEventType.Response:
            console.log(event.body);
            this.alertRegister = event.body
            // this.router.navigate(['/pertayaaan']);
            this.disableTombol = false;
            this.validRegister = true;
        }
       },error => {
        this.disableTombol = false 
        this.validForm = true
       }
     )
  }


  myBrowser() { 

    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {

        return 'Opera';

    }else if(navigator.userAgent.indexOf("Chrome") != -1 ){

        return 'Chrome';

    }else if(navigator.userAgent.indexOf("Safari") != -1){

        return 'Safari';

    }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {

         return 'Firefox';

    }else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.DOCUMENT_NODE == true )){

      return 'IE'; 

    } else {

       return 'unknown';

    }

}

}
