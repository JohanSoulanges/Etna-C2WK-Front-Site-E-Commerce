import { Component, OnInit, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PanierService } from "src/app/shared/services/panier.service";
import { Product } from "src/app/shared/models/product.model";
import { DetailComponent } from "../../popup/detail/detail.component";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-liste",
  templateUrl: "./liste.component.html",
  styleUrls: ["./liste.component.scss"],
})
export class ListeComponent implements OnInit {
  @Input()
  public id!: string;
  @Input() products!: Product | null;

  constructor(
    private dialog: MatDialog,
    private panierService: PanierService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.products) {
      this.id = this.products._id;
    }
  }

  // Open detail popup
  public openDetail(id: string): void {
    console.log("openDetail");

    const dialogRef: MatDialogRef<DetailComponent> = this.dialog.open(
      DetailComponent,
      // Pass id to popup
      { data: { id } }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (true) {
        this.productService.getProductsByUserId();
      }
    });
  }

  public addPanier(): void {
    console.log("ajouter panier");
    this.panierService.confirmationAddPanier();
  }
}
