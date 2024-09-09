import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { NgIf } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { ApiModule } from '../../services/api.module';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [NgIf, CodeInputModule, ApiModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message = '';
  isActivated = false;
  isCodeSubmitted = false;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  private confirmAccount(token: string) {
    this.authService.activateAccount({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.isCodeSubmitted = true;
        this.isActivated = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.isCodeSubmitted = true;
        this.isActivated = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }
}
