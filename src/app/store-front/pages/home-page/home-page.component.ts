import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop'

import { ProductsService } from '@products/services/products.service';
import { ProductsListComponent } from '@products/Components/products-list/products-list.component';


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

}
