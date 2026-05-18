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

  login(){

    const loginData = {

      username:
        this.username.trim(),

      password:
        this.password.trim(),

      role: ''

    };

    console.log(loginData);

    this.api.login(loginData)
      .subscribe({

        next:(res:any)=>{

          console.log(res);

          // Save EmployeeId

          localStorage.setItem(
            'employeeId',
            String(res.employeeId)
          );

          console.log(
            'EMPLOYEE ID SAVED:',
            res.employeeId
          );

          // Save Role

          localStorage.setItem(
            'role',
            res.role || ''
          );

          // Save Username

          localStorage.setItem(
            'username',
            res.username
          );



          // ROLE BASED LOGIN

          const role =
            res.role
            .toLowerCase()
            .trim();



          // EMPLOYEE

          if(
            role === 'employee'
          ){

            this.router.navigate(
              ['/employee-dashboard']
            );

          }



          // HR OR MANAGER

          else if(
            role === 'hr'
            ||
            role === 'manager'
          ){

            this.router.navigate(
              ['/dashboard']
            );

          }



          // FALLBACK

          else{

            alert(
              'Role Not Found'
            );

          }

        },

        error:(err)=>{

          console.log(err);

          alert(
            'Invalid Username or Password'
          );

        }

      });

  }

}