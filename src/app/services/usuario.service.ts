import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import {RegisterForm} from '../interfaces/register-form.interface';
import {LoginForm} from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;
  constructor(private http: HttpClient, 
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
   }

   get token ():string {
     return  localStorage.getItem('token') || '';
   }

   get uid(): string{
     return this.usuario.uid || '';
   }

  googleInit(){
    return new Promise (resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '506090423325-f2q509fc82tiobctrh5ftekcdcjl3dm4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
      resolve();
    }); 
   
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{

   return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'token': this.token,
      }
    }).pipe(
      map((resp:any) => {
        // aqui de destructura los datos de la respuesta 
        // y se crea una nueva instancia todo esto se hace pa obtener
        // todos los datos ya almacenados del lado de cliente
        // console.log(resp)
        const {email,nombre,estado,google,role,img='',uid} = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',estado,img,google,role,uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }

  updateProfile(data:{email: string, nombre:string, role:string}){
    data = {
      ...data,
      role:this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data, {
      headers:{
        'token': this.token,
      }
    });
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`,formData)
        .pipe(
          tap((resp:any) => {
            localStorage.setItem('token', resp.token)
          })
        )
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})
        .pipe(
          tap((resp:any) => {
            localStorage.setItem('token', resp.token)
          })
        )
  }
}
