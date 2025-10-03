import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/products';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent {
  @Input() category!: string;
  products: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    if (this.category) {
      console.log('entre a categorias');
      this.service
        .getByCategory(this.category)
        .subscribe(
          (data) => (this.products = Array.isArray(data) ? data : [data])
        );
    } else {
      console.log('entre a all products');
      this.service.getAll().subscribe((data) => (this.products = data));
    }
  }
}
