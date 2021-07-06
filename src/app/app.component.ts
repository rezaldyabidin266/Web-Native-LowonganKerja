import { Component, OnInit } from '@angular/core';
import { listLoker } from './schemaService/list-loker';
import { ListLokerService } from './service/list-loker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  listLoker : listLoker[];

  data:any;

  constructor(private getListLoker : ListLokerService){
  }

  ngOnInit(){
  }

}
