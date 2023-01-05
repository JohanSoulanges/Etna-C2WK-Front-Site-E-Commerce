import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PanierService } from "src/app/shared/services/panier.service";
import { Product } from "src/app/shared/models/product.model";
import { User } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @Input() public user!: User | null;
  public bestProducts!: Product[] | null;


  // public options = [
  //   { value: "Categorie1", label: "Categorie1" },
  //   { value: "Categorie2", label: "Categorie2" },
  //   { value: "Categorie3", label: "Categorie3" },
  // ];

  // Form
  public form: FormGroup = new FormGroup({
    filter: new FormControl(""),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private panierService: PanierService,
    private productService: ProductService,
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.productService.getBestProducts().then((products) => { 
      // console.log("products best");
      this.bestProducts = products;
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    // Navigate to products page with filter query param
    this.router.navigate(["/products"], {
      queryParams: { filter: this.form.value.filter },
      queryParamsHandling: "merge",
    });
    // console.log("got to products");
    // Set filter to empty string
    this.form.value.filter = "";
  }

  public panier(): void {
    console.log("panier");
    this.panierService.showDialogPanier();
  }
}
