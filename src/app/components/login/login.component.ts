import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AuthService} from "../../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  username: string;
  password: string;
  errorMsg = '';

  ngOnInit() {
  }

  login() : void {
    if(this.username){
      this.auth.authenticate(this.username, this.password)
        if (this.auth.isAuthenticated()) {
          this.router.navigate(["list"]);
        }
    }else {
      this.snackBar.open('Invalid Credentials', 'OK', {
        duration: 3000
      });
    }
  }
}

