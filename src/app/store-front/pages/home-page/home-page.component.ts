import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop'

import { ProductsService } from '@products/services/products.service';
import { ProductsListComponent } from '@products/Components/products-list/products-list.component';
import { Product } from '@products/interfaces/product.interface';


@Component({
  selector: 'app-home-page',
  imports: [
    ProductsListComponent
],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}),
    loader: ({request}) => {
      return this.productsService.getProducts({});
    }
  })

  products = computed<Product[]>(() => {
    if (!this.productsResource.hasValue()) return [];
    return this.productsResource.value().products
  });

  isEmpty = computed<boolean>(() => {
    if (!this.productsResource.hasValue()) return false;
    return this.productsResource.value().products.length === 0;
  });


}
