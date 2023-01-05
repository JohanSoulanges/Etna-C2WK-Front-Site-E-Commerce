// Core: Angular
import { NgModule } from "@angular/core";

// Import: Angular
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

// Import: Interceptor
import { httpInterceptorProviders } from "./shared/interceptor/data-user.interceptor";

// Components: Angular
import { AppComponent } from "./app.component";
import { SigninComponent } from "./view/auth/signin/signin.component";
import { LoginComponent } from "./view/auth/login/login.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HomeComponent } from "./view/components/home/home.component";
import { ContainerComponent } from "./view/components/container/container.component";
import { DetailComponent } from "./view/popup/detail/detail.component";
import { ListeComponent } from "./view/components/liste/liste.component";
import { PanierComponent } from "./view/popup/panier/panier.component";
import { ProfilComponent } from "./view/components/profil/profil.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/module/material.module";
import { UserChangeComponent } from "./view/components/user-change/user-change.component";
import { ProductComponent } from "./view/components/product/product.component";
import { ProductAddComponent } from "./view/components/product-add/product-add.component";
import { ProductModifComponent } from "./product-modif/product-modif.component";
import { AdminPowerComponent } from "./view/components/admin-power/admin-power.component";
import { AdminProductComponent } from "./viex/components/admin-product/admin-product.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContainerComponent,
    DetailComponent,
    ListeComponent,
    PanierComponent,
    ProfilComponent,
    UserChangeComponent,
    ProductComponent,
    ProductAddComponent,
    ProductModifComponent,
    AdminPowerComponent,
    AdminProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
