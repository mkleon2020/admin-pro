import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
   
    {
      titulo: 'Principal',
      icono: 'fal fa-info-circle',
      submenu: [
        {titulo: 'Dashboard', url: '/'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Graficas', url: 'graficas1'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'Rxjs', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Usuario',
      icono: 'fal fa-user',
      submenu: [
        {titulo: 'Perfil', url: 'perfil'},
       
      ]
    }
  ];
  constructor() { }
}
