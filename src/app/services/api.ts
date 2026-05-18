import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl =
  'https://localhost:7197/api/Users/login';

  constructor(private http: HttpClient) { }

  login(data:any){

    return this.http.post(
      this.apiUrl,
      data
    );

  }

  getEmployees(){

    return this.http.get(
      'https://localhost:7197/api/Employee'
    );

  }

  getSurveyAnswers(){

    return this.http.get(
      'https://localhost:7197/api/Survey'
    );

  }

  saveSurvey(data:any){

    return this.http.post(

      'https://localhost:7197/api/Survey',

      data

    );

  }

}