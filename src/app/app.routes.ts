import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PagesRoutes } from './pages/pages.routes';
import { LoginRoutes } from './login/login.routes';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes : Routes = [
   
   
  // path: '/dashboard' PagesRoutes
  // path: '/login' LoginRoutes
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
    imports: [
      RouterModule.forRoot( routes ),
      PagesRoutes,
      LoginRoutes
    ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule { }
  