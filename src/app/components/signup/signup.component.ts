import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'], // Fixed the typo: 'styleUrl' -> 'styleUrls'
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginWithEmail(): void {
    // console.log('hi');
    // if (this.email && this.password) {
    //   this.authService.loginWithEmail(this.email, this.password).subscribe({
    //     next: (response) => {
    //       console.log('Login successful', response);
    //       // Possibly redirect or close modal here
    //     },
    //     error: (error) => {
    //       console.error('Login failed', error);
    //       // Display an error message to the user
    //     }
    //   });
    // } else {
    //   console.warn('Email and password must be provided');
    //   // Display a warning message to the user
    // }
  }

  loginWithGoogle(): void {
    console.log('hiii');
    this.authService.loginWithGoogle().subscribe({
      next: (response) => {
        console.log('Google login successful', response);
        // Possibly redirect or close modal here
      },
      error: (error) => {
        console.error('Google login failed', error);
        // Display an error message to the user
      },
    });
  }

  loginWithApple(): void {
    // console.log('Attempting to login with Apple');
    // this.authService.loginWithApple().subscribe({
    //   next: (response) => {
    //     console.log('Apple login successful', response);
    //     // Possibly redirect or close modal here
    //   },
    //   error: (error) => {
    //     console.error('Apple login failed', error);
    //     // Display an error message to the user
    //   }
    // });
  }

  loginWithFacebook(): void {
    // console.log('Attempting to login with Facebook');
    // this.authService.loginWithFacebook().subscribe({
    //   next: (response) => {
    //     console.log('Facebook login successful', response);
    //     // Possibly redirect or close modal here
    //   },
    //   error: (error) => {
    //     console.error('Facebook login failed', error);
    //     // Display an error message to the user
    //   }
    // });
  }
}
