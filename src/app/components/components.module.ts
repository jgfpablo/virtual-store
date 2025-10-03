import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';

import { ListProductsComponent } from './list-products/list-products.component';

import { CardProductComponent } from './card-product/card-product.component';

@NgModule({
  declarations: [
    MenuBarComponent,
    LoginComponent,
    ListProductsComponent,
    CardProductComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [MenuBarComponent, LoginComponent, ListProductsComponent],
})
export class ComponentsModule {}
