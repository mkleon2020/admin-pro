import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
//componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';



@NgModule({
  declarations: [IncrementadorComponent],
  exports:[
    IncrementadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
  
})
export class ComponentsModule { }
