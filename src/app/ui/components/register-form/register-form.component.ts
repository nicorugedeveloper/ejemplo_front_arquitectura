import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeUseCase} from "../../../domain/usecase/employee.usecase";
import {IEmployeeModel} from "../../../domain/models/employee/employee.model";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {MatDialogRef} from "@angular/material/dialog";
import {ValidationsUseCase} from "../../../domain/usecase/validations.usecase";
import {ToolsUseCase} from "../../../domain/usecase/tools.usecase";



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private employeeUseCase: EmployeeUseCase,
              private errors: ErrorsUseCase,
              private validation : ValidationsUseCase,
              private tools: ToolsUseCase,
              private dialogRef: MatDialogRef<RegisterFormComponent>) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      identification: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      position: ["", [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.minLength(10), Validators.maxLength(30)]],
      salary: ["", [Validators.required, Validators.min(1160000), Validators.max(7000000)]],
      contractStart: ["", Validators.compose([Validators.required, this.validation.dateRange])]
    })
  }

  ngOnInit(): void {
  }

  saveEmployee() {
    let model: IEmployeeModel = {
      name: this.form.value.name,
      id: this.form.value.identification,
      contractStart: this.tools.formatDate(this.form.value.contractStart),
      currentSalary: this.form.value.salary,
    }
    if (this.form.value.position && this.form.value.position !== "") {
      model.position = this.form.value.position
    }
    this.employeeUseCase.createEmployee(model).subscribe(result => {
      if ("name" in result && "id" in result) {
        this._snackBar.open(`Employee register successfully`, "", {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom"
        });
        this.form.reset();
        this.dialogRef.close();
      } else {
        this.errors.error(result);
      }
    })
  }



}
