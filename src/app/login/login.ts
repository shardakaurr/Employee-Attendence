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
      username: this.username.trim(),
      password: this.password.trim(),
      role: ''
    };

    console.log(loginData);

    this.api.login(loginData)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          localStorage.setItem(
            'employeeId',
            String(res.employeeId)
          );

          localStorage.setItem(
            'role',
            res.role || ''
          );

          localStorage.setItem(
            'username',
            res.username
          );

          const role =
            res.role
            .toLowerCase()
            .trim();

          if (role === 'employee') {

            this.router.navigate(
              ['/employee-dashboard']
            );

          }

          else if (role === 'hr') {

            this.router.navigate(
              ['/dashboard']
            );

          }

          else if (
  role === 'manager' ||
  role === 'project manager'
) {

  this.router.navigate(
    ['/employee-dashboard']
  );

}

          else {

            alert(
              'Role Not Found'
            );

          }

        },

        error: (err: any) => {

          console.log(err);

          alert(
            'Invalid Username or Password'
          );

        }

      });

  }

}