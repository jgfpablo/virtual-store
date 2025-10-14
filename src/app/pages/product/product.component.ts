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
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}
  urlWhatsapp: string = '';
  product!: Product;
  id!: string;
  imgActive = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('product') || '';
      this.productService.getById(this.id).subscribe((product) => {
        this.product = product;
        this.urlWhatsapp = `https://wa.me/5493764172282?text=${encodeURIComponent(
          'Hola, quiero más info sobre el producto ' + this.product.nombre
        )}`;
      });
    });
  }
}
