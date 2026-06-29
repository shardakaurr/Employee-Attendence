import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // ====================================
  // BASE URL
  // ====================================

  baseUrl = 'https://localhost:7197/api';

  constructor(
    private http: HttpClient
  ) { }

  // ====================================
  // LOGIN
  // ====================================

  login(data: any) {

    return this.http.post(

      this.baseUrl + '/Users/login',

      data

    );

  }

  // ====================================
  // EMPLOYEES
  // ====================================

  getEmployees() {

    return this.http.get(

      this.baseUrl + '/Employee'

    );

  }

  getEmployeesByManager(
    managerId: number
  ) {

    return this.http.get(

      `${this.baseUrl}/Employee/manager/${managerId}`

    );

  }

  // ====================================
  // SURVEY
  // ====================================

  getSurveyAnswers() {

    return this.http.get(

      this.baseUrl + '/Survey'

    );

  }

  saveSurvey(data: any) {

    return this.http.post(

      this.baseUrl + '/Survey',

      data

    );

  }

  // ====================================
  // PERFORMANCE REVIEW
  // ====================================

  savePerformanceReview(
    data: any
  ) {

    return this.http.post(

      this.baseUrl + '/PerformanceReview',

      data

    );

  }

  getPerformanceReviews() {

    return this.http.get(

      this.baseUrl + '/PerformanceReview'

    );

  }

  // ====================================
  // ATTENDANCE
  // ====================================

  getAttendance() {

    return this.http.get(

      this.baseUrl + '/Attendance'

    );

  }

  // ====================================
  // ATTRITION RISK
  // ====================================

  getAttritionRisk() {

    return this.http.get(

      this.baseUrl + '/AttritionRisk'

    );

  }

  getAIRecommendation(employeeId: number) {

  return this.http.get(

    `${this.baseUrl}/AttritionRisk/ai/${employeeId}`

  );

}

}