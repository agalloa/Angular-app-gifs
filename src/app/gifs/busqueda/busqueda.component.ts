import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('textbuscar') textbuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    const valor = this.textbuscar.nativeElement.value;

    console.log(valor);

    this.textbuscar.nativeElement.value = '';
  }
}
