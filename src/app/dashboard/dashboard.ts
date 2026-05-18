import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})

export class DashboardComponent
implements OnInit {

  employees: any[] = [];

  surveys: any[] = [];

  presentCount: number = 0;

  absentCount: number = 0;

  leaveCount: number = 0;

  selectedSection: string =
    'dashboard';

  loading: boolean = false;

  constructor(

    private api: ApiService,

    private cdr:
      ChangeDetectorRef

  ) {}



  ngOnInit(): void {

    console.log(
      'HR Dashboard Loaded'
    );

    this.selectedSection =
      'dashboard';

    // Load Employees

    this.loadEmployees();

    // Load Surveys

    this.loadSurveys();

  }



  // =========================
  // EMPLOYEES
  // =========================

  loadEmployees(){

    this.api.getEmployees()
      .subscribe({

        next:(res:any)=>{

          console.log(
            'EMPLOYEES'
          );

          console.log(res);



          // IMPORTANT FIX

          this.employees = [
            ...(res || [])
          ];



          // PRESENT COUNT

          this.presentCount =
            this.employees.filter(
              (e:any)=>
                e?.status ===
                'Present'
            ).length;



          // ABSENT COUNT

          this.absentCount =
            this.employees.filter(
              (e:any)=>
                e?.status ===
                'Absent'
            ).length;



          // LEAVE COUNT

          this.leaveCount =
            this.employees.filter(
              (e:any)=>
                e?.status ===
                'Leave'
            ).length;



          // FORCE UI REFRESH

          this.cdr.detectChanges();

        },

        error:(err)=>{

          console.log(err);

        }

      });

  }



  // =========================
  // SURVEYS
  // =========================

  loadSurveys(){

    this.api.getSurveyAnswers()
      .subscribe({

        next:(res:any)=>{

          console.log(
            'SURVEYS'
          );

          console.log(res);



          // IMPORTANT FIX

          this.surveys = [
            ...(res || [])
          ];



          // FORCE UI REFRESH

          this.cdr.detectChanges();

        },

        error:(err)=>{

          console.log(err);

        }

      });

  }

}