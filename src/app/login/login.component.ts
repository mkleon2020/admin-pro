import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import Swal from '../../assets/js/notifications/sweetalert2/sweetalert2.bundle.js';
declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})


export class LoginComponent implements OnInit{
 
  public formSubmitted = false;
  public auth2:any;

  public loginForm = this.fb.group({
    email:[localStorage.getItem('email')|| '', [Validators.required,Validators.email]],
    password:['12345', Validators.required],
    remember:[false]
  });
  constructor( public router: Router, 
            private fb: FormBuilder, 
            private usuarioService: UsuarioService,
            private ngZone: NgZone) { }

  ngOnInit(): void{
    this.renderButton();
  }

  ingresar(){
    console.log(this.loginForm.value)
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        if(this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        }else{
          localStorage.removeItem('email');
        }

        //exitoso mover al dasboar
        this.router.navigateByUrl('/');
    
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp () {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const  id_token = googleUser.getAuthResponse().id_token
          this.usuarioService.loginGoogle(id_token)
          .subscribe(
            resp => {
               //exitoso mover al dasboar
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              });
            }
          );
        
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
