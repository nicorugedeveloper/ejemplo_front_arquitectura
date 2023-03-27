import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";
import {UpdateEmployeeComponent} from "../../components/update-employee/update-employee.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  page  : string = "Employees";

  constructor(private dialogRef : MatDialog) { }

  ngOnInit(): void {
  }

  openSave(): void{
    this.dialogRef.open(RegisterFormComponent)
  }

  onNoClick(): void {
    this.dialogRef.closeAll();
  }

}
