import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  standalone: false,
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {
  ngAfterViewInit() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    btn?.addEventListener('click', () => {
      // menu?.classList.toggle('hidden'); // alterna visibilidad
      menu?.classList.toggle('-translate-x-full');
      overlay?.classList.toggle('hidden');
    });

    overlay?.addEventListener('click', () => {
      menu?.classList.add('-translate-x-full');
      overlay?.classList.add('hidden');
    });
  }
}
