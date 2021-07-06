import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { saveJawaban } from '../schemaService/saveJawaban';
import { GetPertanyaanTokenService } from '../service/get-pertanyaan-token.service';
import { PertayaanService } from '../service/pertayaan.service';
import { SaveJawabanService } from '../service/save-jawaban.service';
import { SaveListService } from '../service/save-list.service';

@Component({
  selector: 'app-pertayaan',
  templateUrl: './pertayaan.component.html',
  styleUrls: ['./pertayaan.component.css']
})
export class PertayaanComponent implements OnInit {

//ambil element secara local elemet unique
@ViewChild('f') saveJawaban: NgForm;
@ViewChildren('div1',{read : ElementRef}) div1: QueryList<any>;
@ViewChildren('div2',{read : ElementRef}) div2: QueryList<any>;

  DataPertayaan :any = [];
  idArray:any = 0;
  bentukPertayaan:any ;
  Lanjut : string = 'Next';
  
  lastPertayaan :any;
  valueStringCheck: any =[];
  nominal : string = '';
  rupiahFormat: number;
  Pilihan:any = [];
  CheckValue:any = [];

  optionsArray:Array<any> = [];

  saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
  saveJawabanArray:Array<saveJawaban> = [];

  //Cara baru
  dataFor: any;
  for2: any = [];
  pageBlock: number = 10;
  pageBlockKiri : number = 0;
  dataFor2 :Array<any> = [];

  dataFor3: Array<any> = [];
  fit: Array<any> = [];

  inputCreate : any;
  idHeader:any;
  sudahRegister:boolean = false;
  textRegister:string;

  constructor( 
     private getPertayaan : PertayaanService,
     private getPertayaanToken : GetPertanyaanTokenService,
     private router : Router,
     private PostSaveJawaban : SaveJawabanService,
     private elRef : ElementRef,
     private renderer : Renderer2,
     private PostSaveListJawaban : SaveListService,
     private http : HttpClient ) { }

  ngOnInit() {

    this.idHeader = localStorage.getItem("idHeaderJawaban");
    const url_pertanyaan = "https://www.api.loker.bogorstudio.com/api/Lokers/form-pertanyaan?idHeaderJawaban=" ;

    //API REAl
      // url_pertanyaan = "https://www.api.loker.esbrasilonline.com/api/lokers/form-pertanyaan?idHeaderJawaban=" ;



    if(localStorage.getItem("token") == null){
      this.http.get(url_pertanyaan + this.idHeader).subscribe((resp:any)=>{
        this.dataFor = resp;
        console.log(resp)
      },(error : HttpErrorResponse) => {
        this.textRegister = error.error
        this.sudahRegister = true;
      });
    }else{
      this.getPertayaanToken.getPertayaanToken().subscribe((resp:any)=>{
        console.log(resp)
        this.dataFor = resp
        this.sudahRegister = false;
      })
    }

  }


  ngAfterViewInit(): void {
   
    this.div1.changes.subscribe(()=>{
      this.div1.toArray().forEach((el,index) =>{
        // console.log(el.nativeElement)
        
        const inputRadio = this.renderer.createElement("input");
        const Label = this.renderer.createElement("label");
        let text = "Yes"

        inputRadio.setAttribute("type","radio");
        inputRadio.setAttribute("value","Yes");
        inputRadio.setAttribute("name",index);
        
        this.renderer.addClass(inputRadio,"form-check-input");
        this.renderer.addClass(Label,"form-check-label");
        Label.innerHTML = text;
       
        // this.renderer.listen(inputRadio,"change",(event)=>{
        //   console.log(event.currentTarget.value)
        // })

        this.renderer.appendChild(el.nativeElement,inputRadio) 
        this.renderer.appendChild(el.nativeElement,Label)
      })
    })

    this.div2.changes.subscribe(()=>{
      this.div2.toArray().forEach((el,index) =>{
        // console.log(el.nativeElement);
        // console.log(el)
        // console.log(index)

        const inputRadio = this.renderer.createElement("input");
        const Label = this.renderer.createElement("label");
        let text = "No"

        inputRadio.setAttribute("type","radio");
        inputRadio.setAttribute("value","No");
        inputRadio.setAttribute("name",index);

        this.renderer.addClass(inputRadio,"form-check-input");
        this.renderer.addClass(Label,"form-check-label");
        Label.innerHTML = text;
       

        // this.renderer.listen(inputRadio,"change",(event)=>{
        //   console.log(event.currentTarget.value)
        // })
       
        this.renderer.appendChild(el.nativeElement,inputRadio) 
        this.renderer.appendChild(el.nativeElement,Label)
      })
    })

  }

  getTextArea(id:number, e : any,pertanyaan : string, i : number){
 

  //  let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
  let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
  let jawaban = e.currentTarget.value

  //  saveJawabanScheman.id = id;
  //  saveJawabanScheman.pertanyaan = pertanyaan;
  //  saveJawabanScheman.jawaban = jawaban;
  //    saveJawabanScheman.jawabanTambahan = null;
  //    saveJawabanScheman.nominal =  1;
  //    saveJawabanScheman.tanggal = DataLocal;
  //    saveJawabanScheman.filePendukung = null;

  //    this.saveJawabanArray.push(saveJawabanScheman);
  //    console.log(saveJawabanScheman)
    //  console.log(this.saveJawabanArray)

    // public id : number,
    // public pertanyaan : string,
    // public jawaban : any,
    // public jawabanTambahan : string,
    // public nominal : number,
    // public tanggal : string,
    // public filePendukung : string,

    let saveJawabanObject = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: jawaban,
      jawabanTambahan : null,
      nominal : 1,
      tanggal : DataLocal,
      filePendukung : null
    }

    this.saveJawabanArray.push(saveJawabanObject);
  }

  getNominal(id:number, e : any,pertanyaan : string){

    let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
    let DateFormat = new DatePipe('en-US').transform(this.saveJawaban.value.date,'dd-MM-yyyy');
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
 
    let jawaban = e.currentTarget.value

    let nominalNormal = this.formatRupiahEsc(jawaban)
    let nominalString = String(nominalNormal)
    // saveJawabanScheman.id = id;
    // saveJawabanScheman.pertanyaan = pertanyaan;
    // saveJawabanScheman.jawaban = String(nominalNormal);
    //   saveJawabanScheman.jawabanTambahan = null;
    //   saveJawabanScheman.nominal = nominalNormal || 1;
    //   saveJawabanScheman.tanggal = DataLocal;
    //   saveJawabanScheman.filePendukung = null;

    let saveJawabanObject = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: nominalString,
      jawabanTambahan : null,
      nominal : nominalNormal || 1,
      tanggal : DataLocal,
      filePendukung : null
    }

     this.saveJawabanArray.push(saveJawabanObject);
}

 getSimpleText(id:number, e : any,pertanyaan : string){

    let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');

    let DateFormat = new DatePipe('en-US').transform(this.saveJawaban.value.date,'dd-MM-yyyy');
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
 
    let jawaban = e.currentTarget.value
 
    // saveJawabanScheman.id = id;
    // saveJawabanScheman.pertanyaan = pertanyaan;
    // saveJawabanScheman.jawaban = jawaban;
    //   saveJawabanScheman.jawabanTambahan = null;
    //   saveJawabanScheman.nominal =  1;
    //   saveJawabanScheman.tanggal = DataLocal;
    //   saveJawabanScheman.filePendukung = null;

    let saveJawabanObject = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: jawaban,
      jawabanTambahan : null,
      nominal :  1,
      tanggal : DataLocal,
      filePendukung : null
    }

     this.saveJawabanArray.push(saveJawabanObject);
 }

 getDate(id:number, e : any,pertanyaan: string){

  let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');

  let DateFormat = new DatePipe('en-US').transform(e.currentTarget.value,'dd-MM-yyyy');
  let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');

  // saveJawabanScheman.id = id;
  // saveJawabanScheman.pertanyaan = pertanyaan;
  // saveJawabanScheman.jawaban = DateFormat;
  // saveJawabanScheman.jawabanTambahan = null;
  // saveJawabanScheman.nominal =  1;
  // saveJawabanScheman.tanggal = DataLocal;
  // saveJawabanScheman.filePendukung = null;

  let saveJawabanObject = {
    id : id,
    pertanyaan : pertanyaan,
    jawaban: DateFormat,
    jawabanTambahan : null,
    nominal :  1,
    tanggal : DataLocal,
    filePendukung : null
  }

    this.saveJawabanArray.push(saveJawabanObject);
 }


  GetStats(e: any,id:number,pertanyaan:string) {
     
  let valueStatus = e.currentTarget.checked; 
  let valueCheck  = e.currentTarget.value;
  if(valueStatus === true){
   this.CheckValue.push(valueCheck)
  } else{
     this.CheckValue.pop();
  }
  this.valueStringCheck = this.CheckValue.toString();

  let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
  let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');

  // saveJawabanScheman.id = id;
  // saveJawabanScheman.pertanyaan = pertanyaan;
  // saveJawabanScheman.jawaban = this.valueStringCheck;
  // saveJawabanScheman.jawabanTambahan = null;
  // saveJawabanScheman.nominal =  1;
  // saveJawabanScheman.tanggal = DataLocal;
  // saveJawabanScheman.filePendukung = null;

  let saveJawabanObject = {
    id : id,
    pertanyaan : pertanyaan,
    jawaban: this.valueStringCheck,
    jawabanTambahan : null,
    nominal :  1,
    tanggal : DataLocal,
    filePendukung : null
  }

  this.saveJawabanArray.push(saveJawabanObject);

  }

  getGanda(e:any,id:number,pertanyaan:string){

  let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
  
  let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
 
  let jawaban = e.currentTarget.id
 
  // saveJawabanScheman.id = id;
  // saveJawabanScheman.pertanyaan = pertanyaan;
  // saveJawabanScheman.jawaban = jawaban;
  // saveJawabanScheman.jawabanTambahan = null;
  // saveJawabanScheman.nominal = jawaban || 1;
  // saveJawabanScheman.tanggal = DataLocal;
  // saveJawabanScheman.filePendukung = null;

  let saveJawabanObject = {
    id : id,
    pertanyaan : pertanyaan,
    jawaban: jawaban,
    jawabanTambahan : null,
    nominal :  1,
    tanggal : DataLocal,
    filePendukung : null
  }

  this.saveJawabanArray.push(saveJawabanObject);

  }

  getQuest(id:number,e :any, pertanyaan : string){

    // console.warn (id, e.target.defaultValue, pertanyaan)

    let saveJawabanScheman = new saveJawaban(null,'','','',null,'','');
  
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
   
    let jawaban = e.target.defaultValue
   
    // saveJawabanScheman.id = id;
    // saveJawabanScheman.pertanyaan = pertanyaan;
    // saveJawabanScheman.jawaban = jawaban;
    // saveJawabanScheman.jawabanTambahan = null;
    // saveJawabanScheman.nominal = jawaban || 1;
    // saveJawabanScheman.tanggal = DataLocal;
    // saveJawabanScheman.filePendukung = null;
  
    let saveJawabanObject = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: jawaban,
      jawabanTambahan : null,
      nominal :  1,
      tanggal : DataLocal,
      filePendukung : null
    }

    this.saveJawabanArray.push(saveJawabanObject);
   
  }

  Post(){

    this.PostSaveListJawaban.PostSaveListJawaban(this.saveJawabanArray).subscribe((resp :any) =>{
      console.log(resp)
    })
     this.router.navigate(['/uploadFile']);
     console.log(this.saveJawabanArray)
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


  //membalikan menjadi intenger biasa
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

