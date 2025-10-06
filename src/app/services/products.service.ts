import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://virtual-store-api-xm81.onrender.com/api/products'; // tu endpoint

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getByCategory(
    category: string,
    page: number,
    limit: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/categoria/${category}?page=${page}&limit=${limit}`
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
