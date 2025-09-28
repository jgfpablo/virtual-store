import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';

@NgModule({
  declarations: [AllProductsComponent],
  imports: [CommonModule],
  exports: [AllProductsComponent],
})
export class PagesModule {}
