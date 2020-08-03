import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
