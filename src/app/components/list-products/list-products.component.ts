import { Component, Input, SimpleChanges } from '@angular/core';
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
  loading = true;

  constructor(private service: ProductsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes['category']) {
      this.loading = true;
      this.products = [];
      if (this.category) {
        console.log('entre a categorias');
        this.service.getByCategory(this.category).subscribe((data) => {
          this.products = Array.isArray(data) ? data : [data];
          this.loading = false;
        });
      } else {
        console.log('entre a all products');
        this.service.getAll().subscribe((data) => {
          this.products = data;
          this.loading = false;
        });
      }
    }
  }
}
