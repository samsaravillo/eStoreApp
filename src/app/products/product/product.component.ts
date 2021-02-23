import {Component, Input} from '@angular/core';
import {Product} from '../../models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }

  getQuantity() { 
    if (!this.shoppingCart) return 0; 

    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  }

}
