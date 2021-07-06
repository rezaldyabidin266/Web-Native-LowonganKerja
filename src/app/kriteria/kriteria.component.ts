import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent,HttpEventType} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { formDaftar } from '../schemaService/formDaftar';
import { FormDaftarService } from '../service/form-daftar.service';
import { GetDataPelamarService } from '../service/get-data-pelamar.service';
import { GetFormService } from '../service/get-form.service';
import { IpServiceService } from '../service/ip-service.service';
import { KriteriaService } from '../service/kriteria.service';

@Component({
  selector: 'app-kriteria',
  templateUrl: './kriteria.component.html',
  styleUrls: ['./kriteria.component.css']
})
export class KriteriaComponent implements OnInit {

  private idKriteria :number;
  judulLowongan : string;
  keterangan : string;
  dataKriteria:any = [];

  getEndJawabanLast: any = [];

  formDaftar : FormGroup;
  ipAddress :  string;

  FormDaftarSchema = new formDaftar('','','','','','','',null,'');

  url_JudulLowongan = "https://www.api.loker.bogorstudio.com/api/Lokers/get-loker?lokerId="

  disableTombol = false;
  validForm = false;
  passwordHide : boolean = true;
  dataPelamar:any;



  constructor(
    private route: ActivatedRoute, 
    private router : Router,
    private getDataKriteria : KriteriaService,
    private postDaftar: FormDaftarService,
    private getIP : IpServiceService,
    private http: HttpClient,
    private getEndJawaban : GetFormService,
    private getPelamar : GetDataPelamarService) { }

  ngOnInit() {
  
  let dataPelamar;
  localStorage.getItem("tokenReplace")

  this.getPelamar.getDataPelamar(localStorage.getItem("tokenReplace"),'').subscribe((resp : any ) =>{

    for(let value of resp){
      this.dataPelamar = value;
     this.passwordHide = false;
      let DateFormat = new DatePipe('en-US').transform(value.tglLahir,'yyyy-MM-dd');
      this.formDaftar = new FormGroup({
        'nama': new FormControl(value.nama,[Validators.required]),
        'email': new FormControl(value.email,[Validators.required, Validators.email]),
        'alamat': new FormControl(value.alamat,[Validators.required]),
        'tempatLahir': new FormControl(value.tempatLahir,[Validators.required]),
        'tglLahir': new FormControl(DateFormat,[Validators.required]),
        'noTlp': new FormControl(value.noTlp,[Validators.required]),
        'note' : new FormControl(null,[Validators.required]),
        'lowonganId' : new FormControl(this.idKriteria),
        'password' : new FormControl(null,[Validators.required])
      });
    }
    },error => {
      this.passwordHide = true;
      console.log('token belum ada')
      this.formDaftar = new FormGroup({
        'nama': new FormControl(null,[Validators.required]),
        'email': new FormControl(null,[Validators.required, Validators.email]),
        'alamat': new FormControl(null,[Validators.required]),
        'tempatLahir': new FormControl(null,[Validators.required]),
        'tglLahir': new FormControl(null,[Validators.required]),
        'noTlp': new FormControl(null,[Validators.required]),
        'note' : new FormControl(null,[Validators.required]),
        'lowonganId' : new FormControl(this.idKriteria),
        'password' : new FormControl(null,[Validators.required])
      });
  })

    this.route.params.subscribe(
      (params: Params)=>{
        this.idKriteria = +params['id'];
      
      }
    )

    this.getIP.getIpAddress().subscribe((resp:any)=>{
     
      this.ipAddress = resp.ip;
    })

    this.http.get(this.url_JudulLowongan + this.idKriteria).subscribe((resp :any)=>{
      
      this.judulLowongan = resp.judulLowongan;
      this.keterangan = resp.keterangan;
    })

     this.getDataKriteria.getKriteria(this.idKriteria).subscribe(
    (resp:any) =>{
     this.dataKriteria = resp;
     })
     ,error =>{
       console.log(error)
     }

    this.formDaftar = new FormGroup({
      'nama': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'alamat': new FormControl(null,[Validators.required]),
      'tempatLahir': new FormControl(null,[Validators.required]),
      'tglLahir': new FormControl(null,[Validators.required]),
      'noTlp': new FormControl(null,[Validators.required]),
      'note' : new FormControl(null,[Validators.required]),
      'lowonganId' : new FormControl(this.idKriteria),
      'password' : new FormControl(null,[Validators.required])
    });
    
  }

  onSubmit(){

    //Format Date
    let DateFormat = new DatePipe('en-US').transform(this.formDaftar.get('tglLahir').value,'dd-MM-yyyy');
    let Ip = this.ipAddress
    let myBrowser = this.myBrowser();
    
    this.FormDaftarSchema.email = this.formDaftar.get('email').value; 
    this.FormDaftarSchema.noTlp = String(this.formDaftar.get('noTlp').value); 
    this.FormDaftarSchema.nama = this.formDaftar.get('nama').value; 
    this.FormDaftarSchema.alamat = this.formDaftar.get('alamat').value; 
    this.FormDaftarSchema.tempatLahir = this.formDaftar.get('tempatLahir').value; 
    this.FormDaftarSchema.tglLahir = this.formDaftar.get('tglLahir').value; 
    this.FormDaftarSchema.note = String( Ip + ' ' + myBrowser); 
    this.FormDaftarSchema.lowonganId = this.formDaftar.get('lowonganId').value; 
    this.FormDaftarSchema.password = this.formDaftar.get('password').value;
    
    this.postDaftar.PostFormDaftar(this.FormDaftarSchema).subscribe((event : HttpEvent<any>)=>{
      // console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          // console.log('Request has been made!');
          this.disableTombol = true;
          break;
        case HttpEventType.ResponseHeader:
          // console.log('Response header has been received!');
          this.disableTombol = true;
          break;
        case HttpEventType.UploadProgress:
          this.disableTombol = true;
          break;
        case HttpEventType.Response:
          // console.log(event.body);
            localStorage.setItem('idCalon', event.body.idCalon);
            localStorage.setItem('idLowongan',event.body.idLowongan);
            localStorage.setItem('idHeaderJawaban', event.body.idHeaderJawaban);
            localStorage.setItem('informasi',event.body.informasi );
           if(localStorage.getItem("token") == null){
             this.router.navigate(['/login'])
           }else{
            this.router.navigate(['/pertayaaan'])
           }
            this.disableTombol = false;
      }
    },error => {
      this.disableTombol = false 
      this.validForm = true
    })

  }


  // getIpAndress(){
  //   this.getIP.getIPAddress().subscribe((resp:any)=>{
  //     this.ipAddress = resp.ip
  //     console.log(resp)
  //   })
  // }

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
