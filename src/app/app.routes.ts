import { Routes } from '@angular/router';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchProductComponent },
  { path: 'showlist', component: ProductListComponent }
];
