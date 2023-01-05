import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/shared/models/product.model";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-admin-product",
  templateUrl: "./admin-product.component.html",
  styleUrls: ["./admin-product.component.scss"],
})
export class AdminProductComponent implements OnInit {
  public products: Product[] | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("params", params);
      this.productService.getProductsByUserIdSpec(params["target"].id);
      this.productService.products.subscribe((products) => {
        this.products = products;
      });
    });
  }

  ngOnInit(): void {}

  public deleteProduct(product: Product): void {
    console.log("delete product", product._id);
    this.productService.deleteProduct(product);
  }

  public modifyProduct(product: Product): void {
    console.log("modify product", product);
    this.router.navigate(["/products/modif"], {
      queryParams: {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        img: product.img,
        id: product._id,
      },
    });
    // this.productService.updateProduct(product);
  }
}
