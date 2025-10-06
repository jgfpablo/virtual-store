import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';

import { ListProductsComponent } from './list-products/list-products.component';

import { CardProductComponent } from './card-product/card-product.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    MenuBarComponent,
    LoginComponent,
    ListProductsComponent,
    CardProductComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    MenuBarComponent,
    LoginComponent,
    ListProductsComponent,
    SpinnerComponent,
  ],
})
export class ComponentsModule {}
