import { ShoppingCart } from '../models/shopping-cart';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
            .pipe(map((x:any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) { 
    this.updateItemQuantity(product, 1);
   }
 
  async removeFromCart(productId) { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/' + productId).remove();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  
  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: number) { 
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) { 
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id).valueChanges();
    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id);
    item$.pipe(take(1)).subscribe(item => { 
      if( item === null ) {
        item$$.set({ product: product, quantity: 1 });
        console.log('adding new product to cart');
      } else{
        item$$.update({quantity: item['quantity'] + change});
        console.log('deducting exisiting product ');
      }
    });
  }

}
