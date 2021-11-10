import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShippingComponent } from './shipping/shipping.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    ShippingComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
