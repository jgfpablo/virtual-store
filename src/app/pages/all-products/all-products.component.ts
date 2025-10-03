import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  constructor(private route: ActivatedRoute) {}

  category!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || '';
      console.log(this.category);
    });
  }
}
