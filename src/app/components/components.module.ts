import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from "../app-routing.module";
import { ProductsComponent } from './products/products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [MenuBarComponent, LoginComponent, ProductsComponent, ListProductsComponent, ProductComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [MenuBarComponent, LoginComponent],
})
export class ComponentsModule {}
