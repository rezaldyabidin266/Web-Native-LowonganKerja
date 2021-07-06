import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { addPengalaman } from '../schemaService/addPengalaman';
import { addPengalamanToken } from '../schemaService/addPengalamanToken';
import { AddPengalamanTokenService } from '../service/add-pengalaman-token.service';
import { AddPengalamanService } from '../service/add-pengalaman.service';
import { GetDataHistoryPengalamanService } from '../service/get-data-history-pengalaman.service';

@Component({
  selector: 'app-add-pengalaman',
  templateUrl: './add-pengalaman.component.html',
  styleUrls: ['./add-pengalaman.component.css']
})
export class AddPengalamanComponent implements OnInit {

  idCalon : any;
  formPengalaman : FormGroup;
  formPengalamanSchema = new addPengalaman('','','','',null,'','');
  formPengalamanToken = new addPengalamanToken('','','',null,'','','');
  formBuilder : FormGroup;
  indexX :number = 1

  respPengalaman : any = [];
  respPengalamanToken: any = [];

  showHide : boolean = false;

  idHeader:any;

  constructor(
    private postPengalamanService : AddPengalamanService, 
    private postPengalamanToken : AddPengalamanTokenService,
    private router : Router,
    private buildForm : FormBuilder,
    private getHistory : GetDataHistoryPengalamanService
    ) {

      this.formBuilder = this.buildForm.group({
        pengalamanForm: this.buildForm.array([])
      })

     }

  ngOnInit() {
    
    // this.idHeader = localStorage.getItem("idHeaderJawaban");
    // console.log(this.idHeader)

  this.getHistory.getDataHistory('').subscribe(
    (resp:any)=>{
    this.respPengalamanToken = resp
    },error =>{
      console.log('token belum ada')
    }
  )

    this.idCalon = localStorage.getItem("idCalon").toString();

    this.formPengalaman = new FormGroup({
      'idCalon': new FormControl(this.idCalon),
      'tempatKerja': new FormControl(null),
      'posisi': new FormControl(null),
      'keterangan': new FormControl(null),
      'salary': new FormControl(null),
      'tglMasuk': new FormControl(null),
      'tglAkhir': new FormControl(null),
    })

  }

  postPengalaman(){

  }

  addPengalaman(){

    let DateTglMsk = new DatePipe('en-US').transform(this.formPengalaman.get('tglMasuk').value,'yyyy-MM-dd');
    let DateTglAkhir = new DatePipe('en-US').transform(this.formPengalaman.get('tglAkhir').value,'yyyy-MM-dd');
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd')

    //value input nominal
    let valueNominal = this.formPengalaman.get('salary').value ;
    //value nominal di ubah ke normal
    let valueNominalNormal = this.formatRupiahEsc(valueNominal)

    //No Token
    this.formPengalamanSchema.idCalon = this.idCalon; 
    this.formPengalamanSchema.tempatKerja = String(this.formPengalaman.get('tempatKerja').value); 
    this.formPengalamanSchema.posisi = String(this.formPengalaman.get('posisi').value); 
    this.formPengalamanSchema.keterangan = String(this.formPengalaman.get('keterangan').value); 
    this.formPengalamanSchema.salary = valueNominalNormal || 0;
    this.formPengalamanSchema.tglMasuk = DateTglMsk || DataLocal;
    this.formPengalamanSchema.tglAkhir = DateTglAkhir || DataLocal;

    //TOken
    this.formPengalamanToken.tempatKerja = String(this.formPengalaman.get('tempatKerja').value); 
    this.formPengalamanToken.posisi = String(this.formPengalaman.get('posisi').value); 
    this.formPengalamanToken.keterangan = String(this.formPengalaman.get('keterangan').value); 
    this.formPengalamanToken.nominal = valueNominalNormal || 0;
    this.formPengalamanToken.tglAwal = DateTglMsk || DataLocal;
    this.formPengalamanToken.tglAkhir = DateTglAkhir || DataLocal;
    this.formPengalamanToken.filePendukung = null;

    if(localStorage.getItem("token") !== null){
      this.postPengalamanToken.postPengalamanToken(this.formPengalamanToken).subscribe(
        (resp:any) =>{
          this.formPengalaman.reset();
          this.getHistory.getDataHistory('').subscribe(
            (resp:any)=>{
            this.respPengalamanToken = resp
            },error =>{
             console.log(error)
            }
          )
        },error => {
          console.log(error)
        }
      )

    }else{
      console.log("hai")
        this.postPengalamanService.postPengalaman(this.formPengalamanSchema).subscribe(
          (resp :any) => {
            this.formPengalaman.reset();
            this.respPengalaman = resp;
            },error => console.log(error)
        )
    }

  }


  rupiah(event : any){
 
    event.target.value = this.formatRupiah(event.target.value,'Rp. ')
    
  }

  formatRupiah(angka:any,prefix:any){
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
   
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }

   formatRupiahEsc(angka){
    let al : any = "";
    if(angka=="" || angka==null || angka=="null" || angka==undefined){
      al = "";
    } else {
      al = Math.abs(angka.replace(/[^,\d]/g, '').toString());
    }
      return al;
  }

}
