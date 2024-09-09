import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { NgFor, NgIf } from '@angular/common';
import { ApiModule } from '../../services/api.module';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ApiModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
    // console.log('LoginComponent loaded...');
   }

  login() {
    this.errorMsg = [];

    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        //save the token
        this.tokenService.token = res.token as string;
        console.log(res);
        
        // this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err.error.validationErrors);
      
          if (err.error.validationErrors) {
            console.log("if");
            this.errorMsg = err.error.validationErrors;
          } else {
            console.log("else");
            this.errorMsg.push(err.error.error);
          }
        }
      });
  }

  register() {
    this.router.navigate(['register'])
    // throw new Error('Method not implemented.');
  }
}
