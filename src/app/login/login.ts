import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})

export class LoginComponent {

  username = '';

  password = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  login() {

    const loginData = {

      username: this.username,

      password: this.password,

      role: ''
    };

    console.log(loginData);

    this.api.login(loginData).subscribe({

      next: (response: any) => {

        console.log(response);

        if(response.role === 'employee') {

          this.router.navigate(['/employee-dashboard']);
        }

        else if(response.role === 'hr') {

          this.router.navigate(['/dashboard']);
        }

        else if(response.role === 'manager') {

          alert('Manager Dashboard Coming Soon');
        }
      },

      error: (error) => {

        console.log(error);

        alert('Invalid Username or Password');
      }
    });
  }
}