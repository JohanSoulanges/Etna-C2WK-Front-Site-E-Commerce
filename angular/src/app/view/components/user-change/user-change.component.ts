import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/shared/services/auth.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "src/app/shared/models/user.model";
import { UserChangeService } from "src/app/shared/services/user-change.service";

@Component({
  selector: "app-user-change",
  templateUrl: "./user-change.component.html",
  styleUrls: ["./user-change.component.scss"],
})
export class UserChangeComponent implements OnInit {
  public id : string | undefined= "";

  public genres = [
    { label: "homme", value: "Homme" },
    { label: "femme", value: "Femme" },
    { label: "autre", value: "Autre" },
  ];

  public form: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{ user: User },
    private authService: AuthService,
    private userChangeService: UserChangeService,
    public dialogRef: MatDialogRef<UserChangeComponent>
  ) {
    console.log("data", data);
    if (data.user) {
      this.form = new FormGroup({
        email: new FormControl(data.user.email),
        username: new FormControl(data.user.username),
        password: new FormControl(""),
        genre: new FormControl(data.user.genre),
      });
      this.id = data.user._id;
    } else {
      this.form = new FormGroup({
        email: new FormControl(this.authService.user$.value?.email),
        username: new FormControl(this.authService.user$.value?.username),
        password: new FormControl(""),
        genre: new FormControl(this.authService.user$.value?.genre),
      });
      this.id = this.authService.user$.value?._id;
    }
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    console.log(this.form.value);
    // if form Valid call service
    this.userChangeService.changeUser(this.id ,this.form.value);
    this.dialogRef.close(this.form.valid);
  }
}
