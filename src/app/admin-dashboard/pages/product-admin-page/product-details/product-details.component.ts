import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "@products/Components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/formUtils';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  product = input.required<Product>()

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    tags: [''],
    sizes: [['']],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  ngOnInit(): void {
    this.setFormValue(this.product())
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any) // con pristine
    // this.productForm.patchValue(formLike as any) // sin pristine
    this.productForm.patchValue({ tags: formLike.tags?.join(',') })
  }

  onSizeClicked(size: string){

    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size),1)
    } else {
      currentSizes.push(size)
    }

    this.productForm.patchValue({sizes: currentSizes})

  }

  onSubmit() {
    console.log("Submit")
    console.log(this.productForm.value)
  }


}
