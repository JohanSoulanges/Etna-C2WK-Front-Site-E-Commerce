import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductModifComponent } from "./view/components/product-modif/product-modif.component";
import { AdminGuard } from "./shared/guards/admin.guard";
import { AuthGuard } from "./shared/guards/auth.guard";
import { DataUserGuard } from "./shared/guards/data-user.guard";
import { LoginComponent } from "./view/auth/login/login.component";
import { SigninComponent } from "./view/auth/signin/signin.component";
import { AdminPowerComponent } from "./view/components/admin-power/admin-power.component";
import { ContainerComponent } from "./view/components/container/container.component";
import { HomeComponent } from "./view/components/home/home.component";
import { PanierComponent } from "./view/components/panier/panier.component";
import { ProductAddComponent } from "./view/components/product-add/product-add.component";
import { ProductComponent } from "./view/components/product/product.component";
import { ProfilComponent } from "./view/components/profil/profil.component";
import { AdminProductComponent } from "./view/components/admin-product/admin-product.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [DataUserGuard] },
  {
    path: "auth/login",
    component: LoginComponent,
    canActivate: [DataUserGuard],
  },
  {
    path: "auth/signin",
    component: SigninComponent,
    canActivate: [DataUserGuard],
  },
  {
    path: "profil",
    component: ProfilComponent,
    canActivate: [DataUserGuard, AuthGuard],
  },
  {
    path: "products",
    component: ProductComponent,
    canActivate: [DataUserGuard],
  },
  {
    path: "products/add",
    component: ProductAddComponent,
    canActivate: [DataUserGuard, AuthGuard],
  },
  {
    path: "products/modif",
    component: ProductModifComponent,
    canActivate: [DataUserGuard, AuthGuard],
  },
  {
    path: "panier",
    component: PanierComponent,
    canActivate: [DataUserGuard, AuthGuard],
  },
  {
    path: "adminPower",
    component: AdminPowerComponent,
    canActivate: [DataUserGuard, AuthGuard, AdminGuard],
  },
  {
    path: "adminProduct",
    component: AdminProductComponent,
    canActivate: [DataUserGuard, AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
