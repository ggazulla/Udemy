import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;

  productos: ItemInterface[] = [];

  productosFiltrado: ItemInterface[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject)=>{
      this.http.get<ItemInterface[]>('https://udemy-95743-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
             .subscribe( resp => {

              // console.log(resp);
              this.productos = resp;
              this.cargando = false;
              resolve("Resolve successful");
            });
    })
  }

  getProducto(id: string){
    return this.http.get(`https://udemy-95743-default-rtdb.europe-west1.firebasedatabase.app/productos/${ id }.json`);
  }

  buscarProducto(termino: string){
    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      // aplicar filtro
      this.filtrarProductos(termino);
    }
    
  }

  private filtrarProductos(termino: string){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo!.toLocaleLowerCase();
      if(prod.categoria!.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    })
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });
    // console.log(this.productosFiltrado);
  }
}
