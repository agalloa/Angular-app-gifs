import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchGifsResponse } from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})

export class GifsService{

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  //APIKEY GIFS
  private apiKey: string = '9rZN0zijiLdhA1bYgvw73jghwZRT5mc3';

  //almacenar strings
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return[...this._historial];
  }

  //peticion http, trabaja en base a observables
  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados ')! ) || [];

    /* if( localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    } */
  }

  //insertar valores a historial
  buscarGifs( query: string = ''){

    //pasarle todo por mayusculas
    query =  query.trim().toLowerCase();

    //si no lo incluye !, evitar que se guarden duplicados
    if( !this._historial.includes( query )){

      this._historial.unshift( query );

      //limita el total de views qque quiero se muestren por pantalla
      this._historial = this._historial.splice(0,10);

      // guardar en localstorage
      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
      .set( 'api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
         // guardar en localstorage
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
    });
  }
}
