import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PanierService } from "src/app/shared/services/panier.service";
import { Product } from "src/app/shared/models/product.model";
import { User } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  public user!: User | null;
  public detail!: Product | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private authService: AuthService,
    private productService: ProductService,
    private panierService: PanierService,
    private router: Router
  ) {
    // Get product from service
    this.authService.user$.subscribe((user) => {
      // Get user from service
      this.user = user;
    });
    
    this.productService.getProducts(this.data);
    this.productService.detail.subscribe((detail) => {
      this.detail = detail;
    });
  }

  ngOnInit(): void {}

  public panier(): void {
    console.log("ajouter panier");
    this.panierService.confirmationAddPanier(this.detail!._id, this.detail!.price);
  }

  public modif(): void {
    console.log("modifier");

    this.router.navigate(["/products/modif"], {
      queryParams: {
        name: this.detail?.name,
        price: this.detail?.price,
        description: this.detail?.description,
        category: this.detail?.category,
        img: this.detail?.img,
        id: this.detail?._id,
      },
      queryParamsHandling: "merge",
    });
  }

  public delet(): void {
    console.log("supprimer");
    this.productService.deleteProduct(this.detail!).subscribe((product: any) => {
      console.log("product", product);
    });
  }
}
