import { Component, OnInit } from "@angular/core";
import { Panier } from "src/app/shared/models/panier.models";
import { PanierService } from "src/app/shared/services/panier.service";

@Component({
  selector: "app-panier",
  templateUrl: "./panier.component.html",
  styleUrls: ["./panier.component.scss"],
})
export class PanierComponent implements OnInit {
  public panier!: Panier | null;

  constructor(private panierService: PanierService) {
    this.panierService.getPanier();
    this.panierService.panier.subscribe((panier) => {
      this.panier = panier;
    });
    console.log("panier", this.panier);
  }

  ngOnInit(): void {}
}
