import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Check Validation of Form
  public onSubmit(): void {
    console.log("Form valid", this.form);
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        // Check if response
        (res) => {
          // Redirection on Home
          this.router.navigateByUrl("/");
        },
        (err) => {
          console.log(err);

          // this.error = err?.error?.message;
        }
      );
    }
    console.log(this.form.value);
  }
}
