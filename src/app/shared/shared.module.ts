import { NgModule } from "@angular/core";

// aqui viene el ngFor ngIf y muchas coas comunes para angular
import { CommonModule } from '@angular/common';

// importar modulo de rutas
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';





@NgModule({ 
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]

})
export class SharedModule {
    
}