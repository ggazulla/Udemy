import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ItemDescription } from 'src/app/interfaces/item-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  producto: ItemDescription | undefined;
  id: string | undefined;

  constructor ( private route: ActivatedRoute,
                public _itemService: ProductosService ){ }

  ngOnInit(){
    this.route.params.subscribe(parametros => {
      // console.log(parametros['id']);
      this._itemService.getProducto(parametros['id'])
        .subscribe( (producto: ItemDescription) => {
          // console.log(producto);
          this.id = parametros['id'];
          this.producto = producto;
        })

    });
  }
}
