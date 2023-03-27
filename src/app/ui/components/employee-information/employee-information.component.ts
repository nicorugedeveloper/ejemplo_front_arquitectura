import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {EmployeeUseCase} from "../../../domain/usecase/employee.usecase";
import {IEmployeeModel} from "../../../domain/models/employee/employee.model";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent implements OnInit {
  employee! : IEmployeeModel;
  id : string;

  constructor(
    private employeeUseCase: EmployeeUseCase,
    private error : ErrorsUseCase,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.findEmployee(this.id);
  }

  findEmployee(id:string){
    this.employeeUseCase.findEmployee(id).subscribe(result => {
      if(result && "name" in result) {
        if (result.position == null){
          result.position = "Not found";
        }
        this.employee = result;
      } else {
        this.error.error(result);
      }
    })
  }
}
