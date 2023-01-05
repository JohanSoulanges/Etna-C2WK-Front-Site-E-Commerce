import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Observable
  public isLogged$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public isAdmin$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  // env varaible
  public DB: String = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  // Function Fetch User
  public fetchCurrentUser(): Observable<User> {
    // console.log('fetchCurrentUser');

    return this.http.get<User>(this.DB + '/auth/current').pipe(
      tap((user: User) => {
        
        this.user$.next(user);
        if (user) {
          this.isLogged$.next(true);
          
          if (user.isAdmin > 1) {
            this.isAdmin$.next(true);
          } else {
            this.isAdmin$.next(false);
          }
        } else {
          this.isLogged$.next(false);
        }

        
      })
    );
  }

  // Function Login
  public login(user: User): Observable<any> {
    return this.http.post(this.DB + '/auth/login', user).pipe(
      tap((token) => {
        // Catch Token a set on localStorage
        localStorage.setItem('token', token.toString());
      })
    );
  }

  // Function Register
  public signin(credentials: {
    email: String;
    password: String;
  }): Observable<User> {
    return this.http.post<User>(this.DB + '/auth/register', credentials)
  }

  // Function Logout
  public logout() {
    localStorage.clear()
    this.router.navigate(['auth/login']);
  }
}
