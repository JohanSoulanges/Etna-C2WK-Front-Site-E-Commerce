import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PanierComponent } from "../../view/popup/panier/panier.component";

@Injectable({
  providedIn: "root",
})
export class PanierService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public showDialogPanier(): void {
    console.log("showDialogPanier");
    const dialogRef = this.dialog.open(PanierComponent);
  }

  public confirmationAddPanier(): void {
    console.log("confirmationAddPanier");
    this.snackBar.open("Produit ajouté au panier", "Fermer", {
      duration: 2000,
    });
  }
}
