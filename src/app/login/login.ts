import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  role = '';

  constructor(private router: Router) {}

  login() {
    if (this.role === 'hr' || this.role === 'manager') {
      this.router.navigate(['/dashboard']);
    } 
    else if (this.role === 'employee') {
      this.router.navigate(['/survey']);
    }
  }

}