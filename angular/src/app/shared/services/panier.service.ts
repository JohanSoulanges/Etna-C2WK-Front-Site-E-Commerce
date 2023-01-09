import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { PanierComponent } from "../../view/popup/panier/panier.component";
import { Panier } from "../models/panier.models";

@Injectable({
  providedIn: "root",
})
export class PanierService {

  // Obervable
  public panier: BehaviorSubject<Panier | null> =
    new BehaviorSubject<Panier | null>(null);

  // variable Environnement
  public DB = "http://localhost:3000/";

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  public showDialogPanier(): void {
    console.log("showDialogPanier");
    const dialogRef = this.dialog.open(PanierComponent);
  }

  public confirmationAddPanier(target: string, price: number): void {
    console.log("confirmationAddPanier");
    this.http
      .post(this.DB + "panier/add", { productId: target, price: price })
      .subscribe((res) => {
        console.log("res",res);
      });
    this.snackBar.open("Produit ajouté au panier", "Fermer", {
      duration: 2000,
    });
  }

  public getPanier(): void {
    console.log("getPanier");
    this.http.get(this.DB + "panier/").subscribe((panier: any) => {
      this.panier.next(panier);
    });
  }

  public validationPanier(): void {
    console.log("validationPanier");
  }
}
