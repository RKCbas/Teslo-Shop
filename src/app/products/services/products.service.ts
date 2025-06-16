import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap, /*tap*/ } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly productsCache = new Map<string, ProductsResponse>();
  private readonly productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options

    const key = `${limit}-${offset}-${gender}`

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.http.get<ProductsResponse>(
      `${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }
    )
      .pipe(
        // tap(resp => console.log(resp)),
        tap(resp => this.productsCache.set(key, resp))
      )
  }

  getProductBySlugId(slugId: string): Observable<Product> {
    if (this.productCache.has(slugId)) {
      return of(this.productCache.get(slugId)!);
    }
    return this.http.get<Product>(
      `${baseUrl}/products/${slugId}`
    ).pipe(
      tap(resp => this.productCache.set(slugId, resp))
    )
  }

}
