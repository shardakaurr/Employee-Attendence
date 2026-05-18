import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-survey',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './survey.html',

  styleUrls: ['./survey.css']
})

export class SurveyComponent {

  answer1 = '';

  answer2 = '';

  answer3 = '';

  constructor(private api: ApiService) {}

  submitSurvey(){

    const surveyData = {

      employeeId: 1,

      question: `
        1. Are you satisfied with your job? : ${this.answer1}

        2. Do you feel valued at work? : ${this.answer2}

        3. Any suggestions? : ${this.answer3}
      `,

      answer: 'Submitted'
    };

    this.api.saveSurvey(surveyData)
      .subscribe({

        next:(res)=>{

          console.log(res);

          alert('Survey Submitted Successfully');
        },

        error:(err)=>{

          console.log(err);

          alert('Error Saving Survey');
        }
      });
  }
}