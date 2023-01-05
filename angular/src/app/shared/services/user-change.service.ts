import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserChangeService {
  // Observable
  public users$: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);

  // env varaible
  public DB: String = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Function Change User
  public changeUser(id: string | undefined, dataChange: User): void {
    this.http.put(this.DB + "/users/user", { params: { id : id, change: dataChange} }).subscribe((res) => {
      console.log("res", res);
    });
  }

  // Function Get All User
  public getAllUser(): void {
    console.log("get all user");
    this.http.get(this.DB + "/users/users").subscribe((data) => {
      // demande a thaumas
      this.users$.next(data as User[]);
    });
  }

  // Function Delete User
  public deleteUser(id: string): void {
    console.log("delete user", id);
    this.http
      .delete(this.DB + "/users/delete", {
        params: { target: id },
      })
      .subscribe((res) => {
        console.log("res", res);
      });
  }
}
