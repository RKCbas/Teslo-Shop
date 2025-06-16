import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsListComponent } from '@products/Components/products-list/products-list.component';
import { GenderTextPipe } from '@products/pipes/gender-text.pipe';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductsListComponent,
    GenderTextPipe
  ],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent {

  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  // ruta/param?queryParam={value}

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

  productsResource = rxResource({
    request: () => ({gender: this.gender()}),
    loader: ({request}) => {
      return this.productsService.getProducts({gender: request.gender});
    }
  })

}
