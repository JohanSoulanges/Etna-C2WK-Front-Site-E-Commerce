import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Panier } from "src/app/shared/models/panier.models";
import { Product } from "src/app/shared/models/product.model";
import { PanierService } from "src/app/shared/services/panier.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-panier",
  templateUrl: "./panier.component.html",
  styleUrls: ["./panier.component.scss"],
})
export class PanierComponent implements OnInit {
  public panier!: Panier | null;
  public items!: any;

  constructor(
    private panierService: PanierService,
    private productService: ProductService,
    private router: Router
  ) {
    this.panierService.getPanier();
    this.panierService.panier.subscribe((panier) => {
      this.panier = panier;
      const arrayPanier: string[] = [];
      panier?.products.forEach((item) => {
        arrayPanier.push(item.productsId);
      });

      this.productService.getPanier(arrayPanier)
      this.productService.items.subscribe((items) => {
        this.items = items;
      });
    });
  }

  ngOnInit(): void {}

  public detail(): void {
    this.router.navigate(["panierDetail"]);
  }
}
