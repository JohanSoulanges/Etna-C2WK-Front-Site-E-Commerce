import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public products: BehaviorSubject<Product[] | null> = new BehaviorSubject<
    Product[] | null
  >(null);
  public detail: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);

  public DB: String = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public getProducts(target: any): any {
    // console.log("getProducts");

    // Set params
    const params = new HttpParams().set("id", target.id);

    return this.http
      .get(this.DB + "/products", { params: params })
      .subscribe((detail: any) => {
        console.log("detail Product", detail);
        this.detail.next(detail);
      });
  }

  public async getBestProducts() {
    console.log("getBestProducts");

    const best: Product[] = [];
    await this.http
      .get(this.DB + "/products/best")
      .subscribe((products: any) => {
        // console.log("best products");
        if (!products) {
          // console.log("no best products");
        } else {
          best.push(...products);
        }
      });
    await this.http
      .get(this.DB + "/products/last")
      .subscribe((products: any) => {
        // console.log("last products");
        if (!products) {
          // console.log("no last products");
        } else {
          best.push(...products);
        }
      });

    return best;
  }

  public async getProductsByCategory(target: any) {
    console.log("products by category");

    const params = new HttpParams().set("filter", target.filter);

    return await this.http
      .get(this.DB + "/products/category", { params: params })
      .subscribe((products: any) => {
        // console.log("products", products);
        this.products.next(products);
      });
  }

  public getProductsByUserId() {
    console.log("products by user id");

    return this.http
      .get(this.DB + "/products/all/id")
      .subscribe((products: any) => {
        this.products.next(products);
      });
  }

  public getProductsByUserIdSpec(id: string) {
    console.log("products by user id spec");

    return this.http
      .get(this.DB + "/products/all/id", { params: { id: id } })
      .subscribe((products: any) => {
        this.products.next(products);
      });
  }

  public addProduct(product: Product): Observable<Product> {
    console.log("create product");

    return this.http.post<Product>(this.DB + "/products/create", product);
  }

  public updateProduct(product: Product): Observable<Product> {
    console.log("update product");

    return this.http.put<Product>(this.DB + "/products", product);
  }

  public deleteProduct(product: Product): Observable<Product> {
    console.log("delete product");

    return this.http.delete<Product>(this.DB + "/products", {
      params: { id: product._id },
    });
  }
}
