import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';
import { Categoria } from '../../interface/categoria';

@Component({
  selector: 'app-menu-bar',
  standalone: false,
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {
  categories: Categoria[] = [];
  constructor(
    private router: Router,
    private serviceCategory: CategoriesService
  ) {}
  buscarInput: string = '';

  mostrarModal = false;
  mostrarLupa = false;

  ngAfterViewInit() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    btn?.addEventListener('click', () => {
      // menu?.classList.toggle('hidden'); // alterna visibilidad
      menu?.classList.toggle('-translate-x-full');
      overlay?.classList.toggle('hidden');
      this.mostrarLupa = !this.mostrarLupa;
    });

    overlay?.addEventListener('click', () => {
      menu?.classList.add('-translate-x-full');
      overlay?.classList.add('hidden');
      this.mostrarLupa = !this.mostrarLupa;
    });
  }

  ngOnInit(): void {
    this.serviceCategory.getCategories().subscribe({
      next: (res: any) => {
        // 👇 asegúrate de acceder al array correcto
        this.categories = res.categorias || [];
      },
      error: (err) => console.error('Error al obtener categorías:', err),
    });
  }

  buscar() {
    const term = this.buscarInput.trim();
    if (!term) return;

    // Redirige a /product con queryParams
    this.router.navigate(['/product'], { queryParams: { search: term } });

    this.buscarInput = '';
  }

  closeMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    menu?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
    this.mostrarLupa = !this.mostrarLupa;
  }
}
