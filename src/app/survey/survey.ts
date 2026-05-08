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

  questions = Array.from({ length: 20 }, (_, i) => ({
    q: "Question " + (i + 1),
    type: i < 15 ? "radio" : "text",
    answer: ""
  }));

  currentPage = 0;
  pageSize = 5;

  get paginatedQuestions() {
    const start = this.currentPage * this.pageSize;
    return this.questions.slice(start, start + this.pageSize);
  }

  next() {
    this.currentPage++;
  }

  prev() {
    this.currentPage--;
  }

  submit() {
    console.log(this.questions);
    alert("Submitted");
  }
}