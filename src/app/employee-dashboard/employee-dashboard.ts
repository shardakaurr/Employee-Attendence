import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from '../survey/survey';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, SurveyComponent],
  templateUrl: './employee-dashboard.html'
})
export class EmployeeDashboardComponent {

  showSurvey = false;

  openSurvey() {
    this.showSurvey = true;
  }

  showProfile() {
    this.showSurvey = false;
  }

}