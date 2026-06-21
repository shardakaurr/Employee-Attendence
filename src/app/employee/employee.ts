import {
  Component,
  OnInit,
  ChangeDetectorRef
}
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
  RouterModule
}
from '@angular/router';

import {
  ApiService
}
from '../services/api';

@Component({

  selector:'app-employee',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl:'./employee.html',

  styleUrls:[
    './employee.css'
  ]

})

export class EmployeeComponent
implements OnInit {

  employee:any = null;

  loading:boolean = true;

  isManager:boolean = false;

  teamMembers:any[] = [];

  ratings:any = {};

  comments:any = {};

  reviewsGiven:number = 0;

  constructor(

    private api: ApiService,

    private cd: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    console.log(
      'Employee Page Loaded'
    );

    const employeeId =
      localStorage.getItem(
        'employeeId'
      );

    console.log(
      'EMPLOYEE ID:',
      employeeId
    );

    this.api.getEmployees()
      .subscribe({

        next:(data:any)=>{

          console.log(data);

          this.employee =
            data.find(

              (e:any)=>

                String(
                  e.employeeId
                )

                ===

                String(
                  employeeId
                )

            );

          console.log(
            'FOUND:',
            this.employee
          );

          // MANAGER CHECK

          if(
            this.employee &&
            this.employee.role &&
            this.employee.role
              .toLowerCase()
              .includes('manager')
          ){

            this.isManager = true;

            this.api
              .getEmployeesByManager(
                this.employee.employeeId
              )
              .subscribe({

                next:(team:any)=>{

                  this.teamMembers =
                    team || [];

                  this.reviewsGiven = 0;

                  console.log(
                    'TEAM:',
                    team
                  );

                  this.cd.detectChanges();

                },

                error:(err:any)=>{

                  console.log(
                    'TEAM ERROR',
                    err
                  );

                }

              });

          }

          this.loading = false;

          this.cd.detectChanges();

        },

        error:(err:any)=>{

          console.log(err);

          this.loading = false;

        }

      });

  }

  saveReview(
    employee:any
  ){

    const review = {

      employeeId:
        employee.employeeId,

      managerId:
        this.employee.employeeId,

      rating:
        this.ratings[
          employee.employeeId
        ] || 1,

      comments:
        this.comments[
          employee.employeeId
        ] || '',

      reviewDate:
        new Date()

    };

    console.log(
      'REVIEW:',
      review
    );

    this.api
      .savePerformanceReview(
        review
      )
      .subscribe({

        next:(res:any)=>{

          console.log(res);

          this.reviewsGiven++;

          alert(
            'Review Saved Successfully'
          );

        },

        error:(err:any)=>{

          console.log(err);

          alert(
            'Error Saving Review'
          );

        }

      });

  }

}