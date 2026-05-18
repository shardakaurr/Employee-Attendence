import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { ApiService }
from '../services/api';

@Component({
  selector: 'app-employee',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './employee.html',

  styleUrls: ['./employee.css']
})

export class EmployeeComponent
implements OnInit {

  employee:any = null;

  loading:boolean = true;

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

                String(e.employeeId)
                ===
                String(employeeId)
            );

          console.log(
            'FOUND:',
            this.employee
          );

          this.loading = false;

          this.cd.detectChanges();

        },

        error:(err)=>{

          console.log(err);

          this.loading = false;

        }

      });

  }

}