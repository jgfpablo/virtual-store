import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent, pathMatch: 'full' },
  { path: 'products/:category', component: AllProductsComponent },
  { path: 'product/:product', component: ProductComponent },

  { path: 'product', component: AllProductsComponent },
  // { path: 'products/:imanes', component: AllProductsComponent },
  // { path: 'products/:llaveros', component: AllProductsComponent },
  // { path: 'products/:portaLlaves', component: AllProductsComponent },
  // { path: 'products/:toppers', component: AllProductsComponent },
  // { path: 'products/:toppersCupcakes', component: AllProductsComponent },
  // { path: 'products/:navidad', component: AllProductsComponent },

  { path: '**', redirectTo: '/' }, //esta es la por defecto por si falla algo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
