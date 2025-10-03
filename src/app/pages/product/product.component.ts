import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {}
  product!: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = params.get('product') || '';
      console.log(this.product);
    });
  }
}
