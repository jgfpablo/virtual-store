import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent {
  @Input() category!: string;
  products: Product[] = [];

  page: number = 1;
  totalPages: number = 1;
  visiblePages: number = 5; // cantidad de páginas a mostrar en el carrusel

  loading = true;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search = params['search']; // leer ?search=...
      if (search) {
        // Si hay búsqueda, llamás al servicio de búsqueda
        this.service.getBySearch(search).subscribe((res: any) => {
          this.products = res.products;
          this.totalPages = res.totalPages;
          this.loading = false;
        });
      } else {
        // Si no hay búsqueda, cargás normalmente
        this.loadProducts();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.page = 1;
      this.loadProducts();
    }
  }

  loadProducts() {
    this.loading = true;
    this.products = [];

    console.log(this.page);
    if (this.category) {
      this.service.getByCategory(this.category, this.page, 6).subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
        },
      });
    } else {
      this.service.getAll(this.page, 6).subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
        },
      });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.visiblePages / 2);
    let start = Math.max(this.page - half, 1);
    let end = Math.min(start + this.visiblePages - 1, this.totalPages);

    // ajustar start si estamos al final
    start = Math.max(end - this.visiblePages + 1, 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
