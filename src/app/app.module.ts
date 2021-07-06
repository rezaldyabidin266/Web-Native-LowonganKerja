import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListLokerService } from './service/list-loker.service';
import { HeaderComponent } from './header/header.component';
import { ListLokerComponent } from './list-loker/list-loker.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { KriteriaComponent } from './kriteria/kriteria.component';
import { KriteriaService } from './service/kriteria.service';
import { FormDaftarService } from './service/form-daftar.service';
import { PertayaanComponent } from './pertayaan/pertayaan.component';
import { SaveJawabanService } from './service/save-jawaban.service';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFotoService } from './service/upload-foto.service';
import { AddPengalamanComponent } from './add-pengalaman/add-pengalaman.component';
import { EndComponent } from './end/end.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { RegisterComponent } from './register/register.component';
import { GantiPasswordComponent } from './ganti-password/ganti-password.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { PertanyaanTokenComponent } from './pertanyaan-token/pertanyaan-token.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListLokerComponent,
    NotFoundComponent,
    KriteriaComponent,
    PertayaanComponent,
    UploadFileComponent,
    AddPengalamanComponent,
    EndComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    GantiPasswordComponent,
    CreatePasswordComponent,
    PertanyaanTokenComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
  ],
  exports: [
    HttpModule,
    DatePipe
],
  providers: [
    ListLokerService,
    KriteriaService,
    FormDaftarService,
    SaveJawabanService,
    UploadFotoService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
