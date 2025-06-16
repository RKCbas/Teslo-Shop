import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "../../../products/Components/product-carousel/product-carousel.component";


@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {

  productsService = inject(ProductsService)

  activatedRoute = inject(ActivatedRoute);
  productSlugId = this.activatedRoute.snapshot.params['idSlug']

  productsResource = rxResource({
    request: () => ({idSlug: this.productSlugId}),
    loader: ({request}) => {
      return this.productsService.getProductBySlugId(request.idSlug);
    }
  })


}
