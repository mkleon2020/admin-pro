import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

 async updatePhoto(
   file:File,
   type:'usuarios'|'medicos'|'hospitales',
   id: string
 ){
    try {
      // esta es otra manera de hacer peticiones al api es puro JS con fetch
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('imagen',file);

      const resp = await fetch(url, {
        method:'PUT',
        headers:{
          'token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();
      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
