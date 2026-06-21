import { Component, OnInit }
from '@angular/core';

import {
  CommonModule
}
from '@angular/common';

import {
  FormsModule
}
from '@angular/forms';

import {
  ApiService
}
from '../services/api';

@Component({

  selector:'app-survey',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./survey.html',

  styleUrls:[
    './survey.css'
  ]

})

export class SurveyComponent
implements OnInit {

  // =========================
  // EMPLOYEE
  // =========================

  employee:any = null;

  // =========================
  // SURVEY VARIABLES
  // =========================

  jobSatisfaction:number = 0;

  workPressure:number = 0;

  managerSupport:number = 0;

  leaveCompany:boolean = false;

  suggestions:string = '';

  selectedBenefits:string[] = [];

  // =========================
  // SURVEY STATUS
  // =========================

  surveySubmitted:boolean = false;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {

    const employeeId =
      localStorage.getItem(
        'employeeId'
      );

    const submitted =
      localStorage.getItem(
        'surveySubmitted_' + employeeId
      );

    if(submitted === 'true'){

      this.surveySubmitted = true;

    }

    this.api.getEmployees()
    .subscribe({

      next:(data:any)=>{

        this.employee =
          data.find(
            (e:any)=>
              String(e.employeeId)
              ===
              String(employeeId)
          );

        console.log(
          'EMPLOYEE:',
          this.employee
        );

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  // =========================
  // CHECKBOX ARRAY
  // =========================

  toggleBenefit(
    value:string,
    event:any
  ){

    if(event.target.checked){

      this.selectedBenefits.push(
        value
      );

    }
    else{

      this.selectedBenefits =
        this.selectedBenefits.filter(
          x => x !== value
        );

    }

  }

  // =========================
  // SUBMIT SURVEY
  // =========================

  submitSurvey(){

    const employeeId =
      localStorage.getItem(
        'employeeId'
      );

    const surveyData = {

      employeeId:
        Number(employeeId),

      employeeName:
        this.employee?.name,

      department:
        this.employee?.department,

      jobSatisfaction:
        this.jobSatisfaction,

      workPressure:
        this.workPressure,

      managerSupport:
        this.managerSupport,

      leaveCompany:
        this.leaveCompany,

      benefits:
        this.selectedBenefits.join(','),

      suggestions:
        this.suggestions

    };

    console.log(
      surveyData
    );

    this.api.saveSurvey(
      surveyData
    ).subscribe({

      next:(res:any)=>{

        console.log(res);

        localStorage.setItem(
          'surveySubmitted_' + employeeId,
          'true'
        );

        this.surveySubmitted = true;

        alert(
          'Survey Submitted Successfully'
        );

      },

      error:(err)=>{

        console.log(err);

        if(
          err.error ===
          'Survey already submitted'
        ){

          alert(
            'You have already submitted the survey.'
          );

          this.surveySubmitted = true;

        }
        else{

          alert(
            'Error Saving Survey'
          );

        }

      }

    });

  }

}