import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './survey.html'
})
export class SurveyComponent {

  questions = [
    { question: "Are you satisfied with your job?", answer: '' },
    { question: "Do you feel valued at work?", answer: '' },
    { question: "Do you plan to stay in company?", answer: '' }
  ];

  submit() {
    console.log(this.questions);
    alert("Feedback submitted!");
  }

}