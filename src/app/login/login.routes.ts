import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';


const routes : Routes = [
    {path: 'register' , component: RegisterComponent},
    {path: 'login' , component: LoginComponent},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports:[RouterModule]
})

export class LoginRoutes{}