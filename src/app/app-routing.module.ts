import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPengalamanComponent } from './add-pengalaman/add-pengalaman.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { EndComponent } from './end/end.component';
import { GantiPasswordComponent } from './ganti-password/ganti-password.component';
import { KriteriaComponent } from './kriteria/kriteria.component';
import { ListLokerComponent } from './list-loker/list-loker.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PertanyaanTokenComponent } from './pertanyaan-token/pertanyaan-token.component';
import { PertayaanComponent } from './pertayaan/pertayaan.component';
import { RegisterComponent } from './register/register.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {path: '',redirectTo: '/loker', pathMatch: 'full'},
  {path: 'loker', component: ListLokerComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gantiPassword', component: GantiPasswordComponent},
  {path: 'createPassword', component: CreatePasswordComponent},
  {path: 'kriteria/:id', component: KriteriaComponent},
  {path: 'pertayaaan', component: PertayaanComponent},
  {path: 'pertayaaanVerfikasi', component: PertanyaanTokenComponent},
  {path: 'uploadFile', component: UploadFileComponent},
  {path: 'addPengalaman', component: AddPengalamanComponent},
  {path: 'end', component: EndComponent},
  {path: 'NotFound', component: NotFoundComponent},
  { path: '**' , redirectTo: '/NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
