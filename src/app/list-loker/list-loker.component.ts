
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listLoker } from '../schemaService/list-loker';
import { GetDataPelamarService } from '../service/get-data-pelamar.service';
import { ListLokerService } from '../service/list-loker.service';

@Component({
  selector: 'app-list-loker',
  templateUrl: './list-loker.component.html',
  styleUrls: ['./list-loker.component.css']
})
export class ListLokerComponent implements OnInit {

  DataLoker:any = [];
  user:any = null;

  data:any;

  constructor(
    private getListLoker : ListLokerService,
    private router: Router,
    private getPelamar : GetDataPelamarService) { }

  ngOnInit() {
    this.getLoker();
    this.getPelamar.getDataPelamar(localStorage.getItem("tokenReplace"),'').subscribe((resp : any ) =>{
      // this.user = resp.nama
      // console.log(this.user)
      resp.forEach((value:any) => {
        this.user = value.nama;
     
        
     });
    },error => {
      console.log('token belum ada')
    })
  }

  getLoker(){
    this.getListLoker.getListLoker().subscribe((resp : any) =>{
      this.DataLoker = resp;
    })
    ,error =>{
      console.log(error)
    }
  }

  goKriteria(idLowongan : number){
    this.router.navigate(['/kriteria',idLowongan])
  }

  getLogin(e:any){
    console.log(e)
    this.data = e;
  }
}
