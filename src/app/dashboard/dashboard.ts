import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container">
      <h2>Dashboard</h2>

      <p>Welcome to HR Dashboard</p>

      <a href="/employee">
        <button>Go to Employee Page</button>
      </a>
    </div>
  `
})
export class DashboardComponent {}