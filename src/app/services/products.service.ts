import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl =
    'https://virtual-store-api-production.up.railway.app/api/products'; // tu endpoint

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, limit: number = 6) {
    return this.http.get<{
      products: Product[];
      total: number;
      totalPages: number;
    }>(`${this.apiUrl}/?page=${page}&limit=${limit}`);
  }

  getByCategory(category: string, page: number = 1, limit: number = 6) {
    return this.http.get<{
      products: Product[];
      total: number;
      totalPages: number;
    }>(`${this.apiUrl}/categoria/${category}?page=${page}&limit=${limit}`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getBySearch(search: string, page: number = 1, limit: number = 6) {
    return this.http.get<{
      products: Product[];
      total: number;
      totalPages: number;
    }>(`${this.apiUrl}/search?q=${search}&page=${page}&limit=${limit}`);
  }
}
