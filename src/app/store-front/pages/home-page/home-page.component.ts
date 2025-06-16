import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { rxResource, toSignal } from '@angular/core/rxjs-interop'

import { ProductsService } from '@products/services/products.service';
import { ProductsListComponent } from '@products/Components/products-list/products-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';



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

  activatedRoute = inject(ActivatedRoute)

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => (isNaN(page) ? 1 : page))
    ),
    {
      initialValue: 1,
    }
  )

  productsResource = rxResource({
    request: () => ({ page: this.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({ offset: request.page * 9 });
    }
  })

}
