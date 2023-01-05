import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Product } from "src/app/shared/models/product.model";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"],
})
export class ProductAddComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(""),
    description: new FormControl(""),
    date: new FormControl(Date.now()),
    venteNb: new FormControl(0),
    ajoutePn: new FormControl(0),
    detailCheck: new FormControl(0),
    category: new FormControl(""),
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.valid) {
      this.productService.addProduct(this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
