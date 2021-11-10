import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { products } from '../../products';
// add cart service
import { CartService } from '../../cart.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product:Product;

  // metodo onInit
  ngOnInit():void {
    //  subscribe to route params and fetch the product based on the productId  
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.product = products[+params.get('productId')];
    });
  }

  // serviço
  addToCart(product: Product):void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }

  // construtor
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

}