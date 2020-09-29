import { NgModule } from "@angular/core";
import { PagesRoutes } from './pages.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

// ng-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';


import { Graficas1Component } from './graficas1/graficas1.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CommonModule } from '@angular/common';









@NgModule({ 

    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        
        
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PagesRoutes,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        ComponentsModule,
        CommonModule

    ]

})
export class PagesModule {}