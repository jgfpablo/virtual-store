import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent, pathMatch: 'full' },
  { path: 'imanes', component: AllProductsComponent },
  { path: 'llaveros', component: AllProductsComponent },
  { path: 'portaLlaves', component: AllProductsComponent },
  { path: 'toppers', component: AllProductsComponent },
  { path: 'toppersCupcakes', component: AllProductsComponent },
  { path: 'navidad', component: AllProductsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
