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

  page = 1;
  totalPages = 1;
  visiblePages = 5;
  loading = true;

  searchTerm: string | null = null;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || null;
      this.page = 1;

      if (!this.searchTerm) {
        this.loadProducts(); // solo carga todos si NO hay búsqueda
      } else {
        this.service.getBySearch(this.searchTerm, this.page, 6).subscribe({
          next: (res: any) => {
            this.products = res.products;
            this.totalPages = res.totalPages;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          },
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && !this.searchTerm) {
      this.page = 1;
      this.loadProducts();
    }
  }

  loadProducts() {
    this.loading = true;
    this.products = [];

    // Si hay búsqueda activa
    if (this.searchTerm) {
      this.service.getBySearch(this.searchTerm, this.page, 6).subscribe({
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
      return;
    }

    // Si hay categoría seleccionada
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
      return;
    }

    // Si no hay búsqueda ni categoría
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
    start = Math.max(end - this.visiblePages + 1, 1);

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  }
}
