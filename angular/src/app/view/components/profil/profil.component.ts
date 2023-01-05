import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserChangeComponent } from "../user-change/user-change.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  public isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

  }

  ngOnInit(): void {}

  public change(): void {
    console.log("change modal");

    const dialogRef: MatDialogRef<UserChangeComponent> =
      this.dialog.open(UserChangeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
      this.snackBar.open("Profil modifié", "OK", {
        duration: 2000,
      });
    });
  }

  public changeAdmin(): void {
    console.log("change admin");
    this.router.navigate(["/adminPower"]);
  }
}
