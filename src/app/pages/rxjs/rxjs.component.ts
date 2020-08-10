import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs:Subscription;
  constructor() { 
    // this.retoraObservable().subscribe(respuesta => console.log('ma',respuesta),
    // error => console.log("Error en el obs",error),
    // () => console.log('Termino el obs')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo (){
    return interval(1000)
      .pipe(
        // take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 ===0)? true:false)
      );
  }
  retoraObservable(): Observable<number>{
    return new Observable (observer => {
      let cont = 0;
      
      let intervalo = setInterval(() => {
        cont++;
        observer.next(cont);
        if(cont == 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(cont == 2){
         
          observer.error('Auxilio error');
        }
      },1000)
    });
  }

}
