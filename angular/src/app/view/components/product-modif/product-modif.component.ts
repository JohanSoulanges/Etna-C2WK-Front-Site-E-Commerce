import { formatCurrency } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Product } from "./../../../shared/models/product.model";
import { ProductService } from "./../../../shared/services/product.service";

@Component({
  selector: "app-product-modif",
  templateUrl: "./product-modif.component.html",
  styleUrls: ["./product-modif.component.scss"],
})
export class ProductModifComponent implements OnInit {
  public product!: Product | null;

  public form: FormGroup = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
    img: new FormControl(""),
    _id: new FormControl(""),
  });

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
    this.activatedRoute.queryParams.subscribe((params) => {
      
      this.product = {
        name: params["name"],
        price: params["price"],
        description: params["description"],
        category: params["category"],
        img: params["img"],
        _id: params["id"],
      };
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log("submit", this.form.value);
    this.form.value._id = this.product?._id;
    this.productService.updateProduct(this.form.value).subscribe((product: any) => {
      console.log("product", product);
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.form.value).subscribe((product: any) => {
      console.log("product", product);
    });
  }
}
