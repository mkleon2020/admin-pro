import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    // EL OBSERVADOR
    let obs = new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval(()=> {
        contador+=1;
        observer.next(contador);
        if(contador == 3){
          clearInterval(intervalo);
          observer.complete();
        }
        if(contador == 2){
          // clearInterval(intervalo);
          observer.error("Auxilio error");
        }
      },1000);
    });
     //AQUI ESCUCHA TODO LO Q HACER EL OBSERVADOR 
     // PIPE EL NUMERO DE VECES TE INTENTO A LA FUNCION
    obs.pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('error en el obs', error),
      () => console.log('El observador termino!')

    );

   }

  ngOnInit(): void {
  }

}
