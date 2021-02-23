import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cart: any; 
  subscription: Subscription;

  constructor(
    private productsService: ProductService,
    private cartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.productsService.getProducts().subscribe(products => this.products = products);
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
