import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PanierService } from "src/app/shared/services/panier.service";
import { Product } from "src/app/shared/models/product.model";
import { ProductService } from "src/app/shared/services/product.service";
import { User } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public user!: User | null;
  public products!: Product[] | null;

  public form: FormGroup = new FormGroup({
    filter: new FormControl(""),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private panierService: PanierService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("params", params);
      
      if (params["filter"] !== undefined && params["filter"] !== "") {
        this.productService.getProductsByCategory(params);
      } else {
        this.productService.getProductsByUserId();
      }

      this.productService.products.subscribe((product) => {
        console.log("product", product);
        this.products = product;
      });
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.router.navigate(["/products"], {
      queryParams: { filter: this.form.value.filter },
      queryParamsHandling: "merge",
    });
    this.form.value.filter = "";
  }

  public panier(): void {
    console.log("panier");
    this.panierService.showDialogPanier();
  }
}
