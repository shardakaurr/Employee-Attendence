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

  employees = [
  { name: 'Rahul Sharma', department: 'IT', role: 'Developer' },
  { name: 'Anjali Verma', department: 'HR', role: 'Manager' },
  { name: 'Rohit Kumar', department: 'Finance', role: 'Analyst' },
  { name: 'Neha Singh', department: 'IT', role: 'Tester' },
  { name: 'Amit Patel', department: 'Operations', role: 'Executive' }
];

  showForm = false;

  searchText = '';

  newEmployee = {
    name: '',
    department: '',
    role: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addEmployee() {
    if (this.newEmployee.name && this.newEmployee.department && this.newEmployee.role) {

      this.employees.push({
        name: this.newEmployee.name,
        department: this.newEmployee.department,
        role: this.newEmployee.role
      });

      this.newEmployee = { name: '', department: '', role: '' };
      this.showForm = false;
    }
  }

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }

  getFilteredEmployees() {
    return this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}