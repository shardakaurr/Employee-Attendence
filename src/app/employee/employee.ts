import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html'
})
export class EmployeeComponent {

  // Employee list
  employees = [
    { name: 'Rahul', department: 'IT', role: 'Developer' },
    { name: 'Anjali', department: 'HR', role: 'Manager' }
  ];

  // Show / hide form
  showForm = false;

  // New employee object
  newEmployee = {
    name: '',
    department: '',
    role: ''
  };

  // Toggle form
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Add employee
  addEmployee() {
    if (this.newEmployee.name && this.newEmployee.department && this.newEmployee.role) {
      
      this.employees.push({
        name: this.newEmployee.name,
        department: this.newEmployee.department,
        role: this.newEmployee.role
      });

      // Reset form
      this.newEmployee = { name: '', department: '', role: '' };

      // Hide form
      this.showForm = false;
    }
  }

  // Delete employee
  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }

}