import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    //http://www.mocky.io/v2/5cc95d2b310000db0c12ccb1
    return this.http.get<Product[]>(
      "https://www.mocky.io/v3/33aa9d30-76b6-4542-ae32-3ef3576205f3"
    );
  }
}
