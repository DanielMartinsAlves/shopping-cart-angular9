import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './model/product';
import { Observable } from 'rxjs';
import { ShippingPrice } from './model/shipping-price';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];

  constructor(
    private http: HttpClient
  ) {}


  addToCart(product:Product):void {
    this.items.push(product);
  }

  getItems(): Product[]{
    return this.items;
  }

  clearCart():Product[] {
    this.items = [];
    return this.items;
  }

  getShippingPrices():Observable<ShippingPrice[]> {
    return this.http.get<ShippingPrice[]>('/assets/shipping.json');
  }
}