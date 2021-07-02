import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GifsService{

  //APIKEY GIFS
  private apiKey: string = '9rZN0zijiLdhA1bYgvw73jghwZRT5mc3';

  //almacenar strings
  private _historial: string[] = [];

  get historial() {
    return[...this._historial];
  }

  //peticion http, trabaja en base a observables
  constructor( private http: HttpClient ){}
  //insertar valores a historial
  buscarGifs( query: string = ''){

    //pasarle todo por mayusculas
    query =  query.trim().toLowerCase();

    //si no lo incluye !, evitar que se guarden duplicados
    if( !this._historial.includes( query )){

      this._historial.unshift( query );

      //limita el total de views qque quiero se muestren por pantalla
      this._historial = this._historial.splice(0,10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=9rZN0zijiLdhA1bYgvw73jghwZRT5mc3&q=naruto&limit=10')
      .subscribe( (resp: any) => {
        console.log(resp);
    });
  }
}
