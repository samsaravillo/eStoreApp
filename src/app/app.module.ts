import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppComponent } from "./app.component";
import { HeaderBarComponent } from "./header-bar/header-bar.component";
import { ProductsComponent } from "./products/products.component";
import { ProductService } from "./services/product.service";
import { ProductComponent } from "./products/product/product.component";
import { HttpClientModule } from "@angular/common/http";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ShoppingCartIconComponent } from "./shopping-cart-icon/shopping-cart-icon.component";
import { ShoppingCartService } from "./services/shopping-cart.service";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    ProductsComponent,
    ProductComponent,
    ShoppingCartComponent,
    ShoppingCartIconComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [ProductService, ShoppingCartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
