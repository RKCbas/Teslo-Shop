import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-table',
  imports: [
    ProductImagePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {

  navRoute = input.required<string>()
  products = input.required<Product[]>()

}
