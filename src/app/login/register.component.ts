import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {UsuarioService} from '../services/usuario.service';
import Swal from '../../assets/js/notifications/sweetalert2/sweetalert2.bundle.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre:['maikol leon', [Validators.required, Validators.minLength(3)]],
    email:['maikol@hotmail.com', [Validators.required,Validators.email]],
    password:['12345', Validators.required],
    password2:['1234', Validators.required],
    terminos:[true, Validators.required],
  }, {
    validators:this.passwordIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router ) { }

  crearUsuario (){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
     return
    }
    // Realizar posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
           //exitoso mover al dasboar
           this.router.navigateByUrl('/');
        }, (err) => {
          //si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNovalido(campo:string): boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNovalidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ( (pass1 !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
   return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string){
    return (FormGroup: FormGroup) =>{
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);
      if ( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsigual:true});
      }
    }
  }

}
