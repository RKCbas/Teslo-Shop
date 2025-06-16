import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'products-list',
  imports: [
    ProductCardComponent,
    JsonPipe
  ],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {

  products = input.required<Product[] | undefined>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  hasValue = input<boolean>(false);
}
