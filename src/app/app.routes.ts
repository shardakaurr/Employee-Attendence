import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeComponent } from './employee/employee';
import { SurveyComponent } from './survey/survey';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent }
];