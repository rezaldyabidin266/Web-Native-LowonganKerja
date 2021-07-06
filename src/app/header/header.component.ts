import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataPelamarService } from '../service/get-data-pelamar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : any = null;
  token:any;
  constructor(
    private router : Router,
    private getPelamar : GetDataPelamarService
    ) { }

  ngOnInit() {
   
    this.getPelamar.getDataPelamar(localStorage.getItem("tokenReplace"),'').subscribe((resp : any ) =>{
      resp.forEach((value:any) => {
        this.user = value.nama
     });
    },error => {
      console.log('token belum ada')
    })

  // const url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-data-pelamar?token=" ;
  //  let replaceToken;
  //  replaceToken = localStorage.getItem("token");
  //  this.token = replaceToken.replace('/','%2F').replace('+','%2B').replace('=','%3D');
  //  this.token = replaceToken.replace('+','%2B');
  //  this.token = replaceToken.replace('=','%3D');
  // console.log(replaceToken)
  // console.log(this.token)
  }

  Home(){
    this.router.navigate(['/']);

  }

  login(){
    this.router.navigate(['login']);
  }

  register(){
    this.router.navigate(['register']);
  }
  
  gantiPassword(){
    this.router.navigate(['gantiPassword']);
    
  }

  logout(){
  
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
      localStorage.clear();
    });
  }

}
