import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;

  productos: ItemInterface[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get<ItemInterface[]>('https://udemy-95743-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
             .subscribe( resp => {

              console.log(resp);
              this.productos = resp;
              this.cargando = false;
            });
  }
}
