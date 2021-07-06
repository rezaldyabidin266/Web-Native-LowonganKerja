import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetFormService } from '../service/get-form.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit, OnDestroy {

  get: any = [];
  idHeader:any;

  constructor(
    private router : Router,
    private getForm : GetFormService,
    private cdRef: ChangeDetectorRef,
    private zone:NgZone,
    private http : HttpClient) { }

  ngOnInit() {
        
    this.idHeader = localStorage.getItem("idHeaderJawaban");
    console.log(this.idHeader)

    const url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-hasil-form?jawabanHeaderId=" ;

    //API REAL
    // url_get = "https://www.api.loker.esbrasilonline.com/api/Lokers/get-hasil-form?jawabanHeaderId="

    this.http.get(url_get + this.idHeader).subscribe((resp:any)=>{
      this.get = resp;
     
    });
    // this.getForm.getPertayaan().subscribe(
    //   (resp :any) =>{
    
    //     this.get = resp;
    //     console.log(resp)

    //   }
    // )

  }

  goLoker(){
    this.router.navigate(['/']);

  }

  ngOnDestroy(){
   
  }

}
