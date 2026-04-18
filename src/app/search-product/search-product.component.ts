import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchName: string = '';
  searchCategory: string = '';
  searched: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.categories = [...new Set(products.map(p => p.category))];
    });
  }

  search(): void {
    this.searched = true;
    const name = this.searchName.trim().toLowerCase();
    const category = this.searchCategory.toLowerCase();

    this.filteredProducts = this.allProducts.filter(p => {
      const matchesName = name ? p.pname.toLowerCase().includes(name) : true;
      const matchesCategory = category ? p.category.toLowerCase() === category : true;
      return matchesName && matchesCategory;
    });
  }
}
