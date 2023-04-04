import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import {SignUpFormComponent} from "./view/sign-up-form/sign-up-form.component";

const routes: Routes = [{ path: '', component: SignUpComponent, children:[
    {path:'', component:SignUpFormComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
