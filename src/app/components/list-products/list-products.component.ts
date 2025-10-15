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
  noResults = false;

  private mode: 'all' | 'category' | 'search' = 'all'; // 🔹 control central

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const rawSearch = params['search'];
      const trimmed = rawSearch?.trim() || '';

      const newSearch = trimmed.length > 0 ? trimmed : null;

      if (newSearch !== this.searchTerm) {
        this.searchTerm = newSearch;
        this.page = 1;
        this.noResults = false;

        if (this.searchTerm) {
          this.mode = 'search';
          this.loadSearchResults();
        } else if (this.category) {
          this.mode = 'category';
          this.loadCategoryOrAll();
        } else {
          this.mode = 'all';
          this.loadCategoryOrAll();
        }
      }
    });

    // 🟢 Detectar si estamos en "/"
    this.route.url.subscribe((segments) => {
      const currentPath = segments.map((s) => s.path).join('/');
      if (!currentPath && !this.searchTerm) {
        // Estamos en inicio y no hay búsqueda activa
        this.category = '';
        this.mode = 'all';
        this.loadCategoryOrAll();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ⚠️ Evitar recarga si estamos en modo búsqueda
    if (this.mode === 'search') return;

    if (changes['category'] && this.category) {
      this.page = 1;
      this.noResults = false;
      this.mode = 'category';
      this.loadCategoryOrAll();
    }
  }

  private loadSearchResults(): void {
    this.loading = true;
    this.products = [];
    this.noResults = false;

    this.service.getBySearch(this.searchTerm!, this.page, 6).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.products = res.products;
        this.totalPages = res.totalPages;
        this.noResults = res.products.length === 0;

        // 🔹 si no hay resultados, permanecemos en modo "search"
        if (this.noResults) this.mode = 'search';
      },
      error: () => {
        this.loading = false;
        this.noResults = true;
        this.mode = 'search';
      },
    });
  }

  private loadCategoryOrAll(): void {
    this.loading = true;
    this.products = [];
    this.noResults = false;

    const obs = this.category
      ? this.service.getByCategory(this.category, this.page, 6)
      : this.service.getAll(this.page, 6);

    obs.subscribe({
      next: (res: any) => {
        this.loading = false;
        this.products = res.products;
        this.totalPages = res.totalPages;
        this.noResults = res.products.length === 0;
      },
      error: () => {
        this.loading = false;
        this.noResults = true;
      },
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      if (this.mode === 'search') this.loadSearchResults();
      else this.loadCategoryOrAll();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      if (this.mode === 'search') this.loadSearchResults();
      else this.loadCategoryOrAll();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      if (this.mode === 'search') this.loadSearchResults();
      else this.loadCategoryOrAll();
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
