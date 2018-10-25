import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username = '';


  constructor() { }



  public isAuthenticated(): boolean {
    this.username = localStorage.getItem('credentials');
    if (this.username) {
      return true
    }
  }

  public authenticate(username: string, password: string) {
    localStorage.setItem('credentials', username);
    this.username = username;
  }

  public logOut() {
    localStorage.removeItem("credentials");
    this.username = '';
  }
}
