import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './shared/models/product.model';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user$: Observable<User | null> = this.authService.user$.asObservable();

  constructor(private authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout()
  }
}
