import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<h2>Dashboard Page</h2>
             <a href="/employee">Go to Employee Page</a>`
})
export class DashboardComponent {}