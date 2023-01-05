import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, first, map, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataUserGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): Observable<true> {
    // console.log("DataUserGuard");
    
    return this.authService.user$.pipe(
      first(),
      switchMap((user: User | null): Observable<true> => {
        // Set User in a Observalbe User$
        return this.authService.fetchCurrentUser().pipe(map(() => true));
      })
      );
    }
}
