import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  pid: number;
  pname: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/db.json';
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.productsSubject.next(this.products);
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  deleteProduct(pid: number): void {
    this.products = this.products.filter(p => p.pid !== pid);
    this.productsSubject.next([...this.products]);
  }
}
