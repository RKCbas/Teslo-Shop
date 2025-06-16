import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop'

import { ProductsService } from '@products/services/products.service';
import { ProductsListComponent } from '@products/Components/products-list/products-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [
    ProductsListComponent,
    PaginationComponent
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService)

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({ offset: request.page * 9 });
    }
  })

}
