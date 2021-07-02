import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('textbuscar') textbuscar!: ElementRef<HTMLInputElement>;

  //Injectar el servicio en la busqueda de los gifs
  constructor( private gifsService: GifsService){}


  buscar(){
    const valor = this.textbuscar.nativeElement.value;

    //  ver servicio linea 20
    if( valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs( valor );

    this.textbuscar.nativeElement.value = '';
  }
}
