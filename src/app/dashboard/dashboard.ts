import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ApiService
} from '../services/api';

@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']

})

export class DashboardComponent
implements OnInit {

  // ==================================
  // ARRAYS
  // ==================================

  employees:any[]=[];

  attendance:any[]=[];

  surveys:any[]=[];

  reviews:any[]=[];

  attritionRisks:any[]=[];

  // ==================================
  // COUNTS
  // ==================================

  presentCount=0;

  absentCount=0;

  leaveCount=0;

  // ==================================
  // PAGE
  // ==================================

  selectedSection='dashboard';

  loading=false;

  // ==================================
  // PAGINATION
  // ==================================

  currentPage=1;

  pageSize=10;

  // ==================================
  // FILTER
  // ==================================

  selectedDepartment='All';

  // ==================================
  // RIGHT PANEL
  // ==================================

  riskPanelOpen=false;

  selectedRiskEmployee:any=null;

  riskReasons:string[]=[];

  constructor(

    private api:ApiService,

    private cdr:ChangeDetectorRef

  ){

  }

  ngOnInit():void{

    console.log(

      'HR Dashboard Loaded'

    );

    this.loadEmployees();

this.loadAttendance();

this.loadSurveys();

this.loadReviews();


  }
    // ==================================
  // PAGINATION
  // ==================================

  get totalPages(): number {

    return Math.ceil(

      this.employees.length /

      this.pageSize

    );

  }

  get paginatedEmployees() {

    const start =

      (this.currentPage - 1)

      * this.pageSize;

    return this.employees.slice(

      start,

      start + this.pageSize

    );

  }

  changePage(page:number){

    if(

      page>=1 &&

      page<=this.totalPages

    ){

      this.currentPage=page;

    }

  }
// =========================
// ATTRITION PAGINATION
// =========================

currentRiskPage = 1;

riskPageSize = 10;

get totalRiskPages(): number {

  return Math.ceil(
    this.filteredAttritionRisks.length /
    this.riskPageSize
  );

}

get paginatedRiskEmployees() {

  const start =
    (this.currentRiskPage - 1) *
    this.riskPageSize;

  return this.filteredAttritionRisks.slice(
    start,
    start + this.riskPageSize
  );

}

changeRiskPage(page:number){

  if(
    page >= 1 &&
    page <= this.totalRiskPages
  ){

    this.currentRiskPage = page;

  }

}
  // ==================================
  // DEPARTMENT FILTER
  // ==================================

  get filteredAttritionRisks(){

    if(

      this.selectedDepartment=='All'

    ){

      return this.attritionRisks;

    }

    return this.attritionRisks.filter(

      x=>

      x.department==

      this.selectedDepartment

    );

  }

  // ==================================
  // RIGHT SIDE PANEL
  // ==================================

  openRiskPanel(emp:any){

    this.selectedRiskEmployee=emp;

    this.showRiskDetails(emp);

    this.riskPanelOpen=true;

  }

  closeRiskPanel(){

    this.riskPanelOpen=false;

    this.selectedRiskEmployee=null;

    this.riskReasons=[];

  }

  // ==================================
  // RISK DETAILS
  // ==================================
showRiskDetails(emp:any){

  this.riskReasons=[];

  this.selectedRiskEmployee=emp;

  if(emp.reason){

    this.riskReasons=

    emp.reason

    .split(".")

    .filter(

      (x:string)=>

      x.trim()!=""

    );

  }

}
  
    // ==================================
  // LOAD EMPLOYEES
  // ==================================

  loadEmployees(){

    this.api.getEmployees()

    .subscribe({

      next:(res:any)=>{

        console.log("EMPLOYEES");

        console.log(res);

        this.employees=[

          ...(res||[])

        ];

        this.currentPage=1;

        this.presentCount=

        this.employees.filter(

          (e:any)=>

          e.status=="Present"

        ).length;

        this.absentCount=

        this.employees.filter(

          (e:any)=>

          e.status=="Absent"

        ).length;

        this.leaveCount=

        this.employees.filter(

          (e:any)=>

          e.status=="Leave"

        ).length;

        this.loadAttritionRisk();


        this.cdr.detectChanges();

      },

      error:(err:any)=>{

        console.log(err);

      }

    });

  }

  // ==================================
// LOAD ATTENDANCE
// ==================================

loadAttendance(){

  this.api.getAttendance()

  .subscribe({

    next:(res:any)=>{

      console.log("ATTENDANCE");

      console.log(res);

      this.attendance=[

        ...(res||[])

      ];

      this.loadAttritionRisk();

      this.cdr.detectChanges();

    },

    error:(err:any)=>{

      console.log(err);

    }

  });

}

  // ==================================
  // LOAD SURVEY
  // ==================================

  loadSurveys(){

    this.api.getSurveyAnswers()

    .subscribe({

      next:(res:any)=>{

        console.log("SURVEYS");

        console.log(res);

        this.surveys=[

          ...(res||[])

        ];

        this.loadAttritionRisk();

        this.cdr.detectChanges();

      },

      error:(err:any)=>{

        console.log(err);

      }

    });

  }

  // ==================================
  // LOAD PERFORMANCE REVIEW
  // ==================================

  loadReviews(){

    this.api.getPerformanceReviews()

    .subscribe({

      next:(res:any)=>{

        console.log("REVIEWS");

        console.log(res);

        this.reviews=[

          ...(res||[])

        ];

        this.loadAttritionRisk();


        this.cdr.detectChanges();

      },

      error:(err:any)=>{

        console.log(err);

      }

    });

  }

  // ==================================
// LOAD ATTRITION
// ==================================

loadAttritionRisk(){

  this.api.getAttritionRisk()

  .subscribe({

    next:(res:any)=>{

      console.log("ATTRITION");

      console.log(res);

      this.attritionRisks=[

        ...(res||[])

      ];

      this.currentRiskPage=1;

      this.cdr.detectChanges();

    },

    error:(err:any)=>{

      console.log(err);

    }

  });

}

   
    // ==================================
  // RISK COLOR
  // ==================================

  getRiskColor(level: string): string {

    switch (level) {

      case 'High Risk':

        return '#dc2626';

      case 'Medium Risk':

        return '#f59e0b';

      case 'Low Risk':

        return '#16a34a';

      default:

        return '#374151';

    }

  }

  // ==================================
  // RECOMMENDATION
  // ==================================

  getRecommendation(score: number): string {

    if (score >= 61) {

      return 'Immediate HR discussion with Manager is recommended.';

    }

    if (score >= 31) {

      return 'Monitor employee performance and engagement regularly.';

    }

    return 'Employee is performing well. Continue regular monitoring.';

  }
}