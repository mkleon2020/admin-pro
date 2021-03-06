import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// para proteger la rutas de la web
import {AuthGuard} from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes : Routes = [
    {
        path: 'dashboard' , 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '' , component: DashboardComponent, data:{titulo:'Dashboard'}},
        //    usuario
            {path: 'perfil' , component: PerfilComponent, data:{titulo:'Perfil Usuario'} },
        //    dasboarh
            {path: 'progress' , component: ProgressComponent, data:{titulo:'Progress'} },
            {path: 'graficas1' , component: Graficas1Component, data:{titulo:'Graficas 1'} },
            {path: 'promesas' , component: PromesasComponent, data:{titulo:'Promesas'} },
            {path: 'rxjs' , component: RxjsComponent, data:{titulo:'Rxjs'} },
            {path: 'account-settings' , component: AccountSettingsComponent,  data:{titulo:'Acount Settings'} },
            {path: '' , redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutes {}