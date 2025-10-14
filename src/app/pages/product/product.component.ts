import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/products';
@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  mensaje = '';
  url = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}
  product!: Product;
  id!: string;
  imgActive = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('product') || '';
      this.productService.getById(this.id).subscribe((product) => {
        this.product = product;
      });

      if (this.product) {
        this.mensaje = `Hola, quiero más info sobre el producto ${this.product.nombre}`;
        this.url = `https://wa.me/5493764172282?text=${encodeURIComponent(
          this.mensaje
        )}`;
      }
    });
  }
}
