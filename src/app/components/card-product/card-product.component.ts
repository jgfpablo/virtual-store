import { Component, Input } from '@angular/core';
import { Product } from '../../interface/products';

@Component({
  selector: 'app-card-product',
  standalone: false,
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  @Input() product!: Product;
}
