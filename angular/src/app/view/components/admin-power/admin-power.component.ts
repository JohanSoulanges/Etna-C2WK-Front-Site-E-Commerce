import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/shared/models/user.model";
import { UserChangeService } from "src/app/shared/services/user-change.service";
import { UserChangeComponent } from "../user-change/user-change.component";
import { ProductService } from "src/app/shared/services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-power",
  templateUrl: "./admin-power.component.html",
  styleUrls: ["./admin-power.component.scss"],
})
export class AdminPowerComponent implements OnInit {
  public users$: User[] | null = null;

  constructor(
    private userChangeService: UserChangeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private router: Router
  ) {
    this.userChangeService.getAllUser();

    this.userChangeService.users$.subscribe((users) => {
      this.users$ = users;
    });
  }

  ngOnInit(): void {}

  public modifyUser(user: User): void {
    console.log("change user");
    const dialogRef: MatDialogRef<UserChangeComponent> = this.dialog.open(
      UserChangeComponent,
      {
        data: { user },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
      this.snackBar.open("Profil modifié", "OK", {
        duration: 2000,
      });
      this.userChangeService.getAllUser();

      this.userChangeService.users$.subscribe((users) => {
        this.users$ = users;
      });
    });
  }

  public deleteUser(id: string): void {
    console.log("delete user", id);

    this.userChangeService.deleteUser(id);
    this.snackBar.open("Profil Delete", "OK", {
      duration: 2000,
    });

    this.userChangeService.getAllUser();

    this.userChangeService.users$.subscribe((users) => {
      this.users$ = users;
    });
  }

  public productUser(id: string): void {
    console.log("product user", id);

    this.router.navigate(["/adminProduct"], {
      queryParams: { target: id },
      queryParamsHandling: "merge",
    });

    
  }
}
