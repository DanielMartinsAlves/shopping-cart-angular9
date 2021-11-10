import { Component, OnInit } from '@angular/core';
// module
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';

// decorator
@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product:Product;
  @Output() notify:EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}