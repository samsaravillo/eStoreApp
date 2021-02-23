import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() product: Product;
  cart$;
  
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
      this.cart$ = await this.cartService.getCart();
  }

  removeToCart(productId) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() { 
   this.cartService.clearCart(); 
  }


}
