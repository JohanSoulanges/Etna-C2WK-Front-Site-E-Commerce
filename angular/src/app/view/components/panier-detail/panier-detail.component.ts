import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Panier } from "src/app/shared/models/panier.models";
import { PanierService } from "src/app/shared/services/panier.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-panier-detail",
  templateUrl: "./panier-detail.component.html",
  styleUrls: ["./panier-detail.component.scss"],
})
export class PanierDetailComponent implements OnInit {
  public panier!: Panier | null;
  public items!: any;

  constructor(
    private panierService: PanierService,
    private productService: ProductService
  ) {
    this.panierService.panier.subscribe((panier) => {
      if (panier) {
        this.panier = panier;
        this.productService.items.subscribe((items) => {
          this.items = items;
        });
      } else {
        this.panierService.getPanier();
        this.panierService.panier.subscribe((panier) => {
          this.panier = panier;
          const arrayPanier: string[] = [];
          panier?.products.forEach((item) => {
            arrayPanier.push(item.productsId);
          });

          this.productService.getPanier(arrayPanier);
          this.productService.items.subscribe((items) => {
            this.items = items;
          });
        });
      }
    });
  }

  ngOnInit(): void {}

  public buy(): void {
    console.log("buy");
  }
}
