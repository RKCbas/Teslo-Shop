import { NgClass, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, /*computed, */ input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    SlicePipe,
    NgClass,
    ProductImagePipe
  ],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  // imageUrl = computed(() => {
  //   if (!this.product().images?.[0]?.length || this.product().images?.[0] === 'undefined') {
  //     // Placeholder image URL, you can replace it with a more suitable placeholder
  //     return 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  //   }
  //   return `http://localhost:3000/api/files/product/${this.product().images[0]}`
  // })
}
