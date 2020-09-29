import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from '../../../assets/js/notifications/sweetalert2/sweetalert2.bundle.js';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imageStage: File;
  public imgTemp:any;


  constructor(
    private fb:FormBuilder, 
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]],
    });
  }

  updateProfile(){
    console.log(this.profileForm.value);
    this.usuarioService.updateProfile(this.profileForm.value)
    .subscribe(resp => {
      const {nombre, email} = this.profileForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('PERFIL', 'Actualizado', 'success');
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
  changeImage(file:File){
   this.imageStage = file;
   if(!file){
     return this.imgTemp = null;
    }
   const reader = new FileReader();
  reader.readAsDataURL(file);

   reader.onloadend = () => {
     this.imgTemp = reader.result;
   }
  }
  uploadImage(){
    this.fileUploadService.updatePhoto(
      this.imageStage,
      'usuarios',
      this.usuario.uid
    ).then(img => {
      this.usuario.img = img;
      Swal.fire('IMAGEN', 'Actualizada', 'success');
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }

}
