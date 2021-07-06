import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFotoService } from '../service/upload-foto.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFoto : any;
  selectedCv: any;
  idCalon : any;

  suksesFoto: boolean = false;
  gagalFoto : boolean = false;
  suksesCv: boolean = false;
  gagalCv : boolean = false;

  disableFoto: boolean ;
  disableCv : boolean;
  disableNext: boolean;

  formatCv : boolean = false;
  formatFoto : boolean = false;

  progress: number = 0;
  progressCv: number = 0;

  idCalonNumber : any;

  constructor(private postFotoService : UploadFotoService, private router: Router) { }

  ngOnInit() {

    this.idCalon = localStorage.getItem("idCalon");
    this.idCalonNumber = parseInt(this.idCalon)

    this.disableFoto = false;
    this.disableCv = false;
    this.disableNext = true;
 
  }

  getFileInput(event:any){

      this.selectedFoto = <File>event.target.files[0];
      console.log(this.selectedFoto.name)
     
      if (!this.validateFoto(this.selectedFoto.name)) {
        event.target.value='';
        this.formatFoto = true;
        
        console.log(this.selectedFoto.value)
        return false;
    } 
    
  }

  validateFoto(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
        return true;

    }else if(ext.toLowerCase() == 'jpg') {
      return true;

    }else if(ext.toLowerCase() == 'jpeg'){
      return true;
    }
    else {
        return false;
    }
}


  postFoto(){
    console.log(this.selectedFoto.name)
    const uploadFoto = new FormData();
    uploadFoto.append("Id",this.idCalonNumber);
    uploadFoto.append("FileGambar",this.selectedFoto,this.selectedFoto.name);
    // this.postFotoService.postFoto(uploadFoto).subscribe((resp: any,)=>{
    //   console.log(resp)
    //   this.suksesFoto = true;
    //   this.disableFoto= true;
    // }),error => {
    //   this.gagalFoto = true;
    //   this.disableFoto= false;
    // }
    this.postFotoService.postFoto(uploadFoto).subscribe((event : HttpEvent<any>) =>{
      console.log(event)
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log(event.body);
          this.suksesFoto = true;
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    })
  }


  getFileInputCv(event:any){
    this.selectedCv = <File>event.target.files[0];

    if (!this.validateCv(this.selectedCv.name)) {
      event.target.value='';
      this.formatCv = true;
 
      console.log(this.selectedCv.value)
      return false;
  } 
  
  }


  validateCv(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf') {
        return true;
    }
    else {
        return false;
    }
}



  postCv(){
    console.log(this.selectedCv.name)
    const uploadCv = new FormData();
    uploadCv.append("Id",this.idCalonNumber);
    uploadCv.append("FileGambar",this.selectedCv,this.selectedCv.name);
    // this.postFotoService.postCv(uploadCv).subscribe((resp: any)=>{
    //   console.log(resp)
    //   this.suksesCv= true;
    //   this.disableCv = true;
    // }),error => {
    //   this.gagalCv = true;
    //   this.disableCv = false;
    // }
    this.postFotoService.postCv(uploadCv).subscribe((event : HttpEvent<any>) =>{
      console.log(event)
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progressCv = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progressCv}%`);
          break;
        case HttpEventType.Response:
          console.log(event.body);
          this.suksesCv = true;
          setTimeout(() => {
            this.progressCv = 0;
          }, 1500);
      }
    })
  }

  nextPage(){
   
    if (this.disableFoto == true || this.disableCv == true) 
    {
      return false;
      
    } else {

      return true;
    }

  }

}
