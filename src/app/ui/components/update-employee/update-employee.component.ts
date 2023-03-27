import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeUseCase} from "../../../domain/usecase/employee.usecase";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {ValidationsUseCase} from "../../../domain/usecase/validations.usecase";
import {ToolsUseCase} from "../../../domain/usecase/tools.usecase";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUpdateEmployeeModel} from "../../../domain/models/employee/employee.model";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  form: FormGroup;

  id: string;

  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private employeeUseCase: EmployeeUseCase,
              private errors: ErrorsUseCase,
              private validation : ValidationsUseCase,
              private tools: ToolsUseCase,
              @Inject(MAT_DIALOG_DATA) public data: {id: string},
              private dialogRef: MatDialogRef<UpdateEmployeeComponent>) {
    this.form = this.formBuilder.group({
      newPosition: ["", [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.minLength(10), Validators.maxLength(30)]],
      newSalary: ["", [Validators.required, Validators.min(1160000), Validators.max(7000000)]],
      modificationDay: ["", Validators.compose([Validators.required, this.validation.startDateRange])]

    })

    this.id = data.id;


  }

  ngOnInit(): void {
  }

  updateEmployee() {
    let model: IUpdateEmployeeModel = {
      id: this.id,
      updateSalary: this.form.value.newSalary,
      modificationDate: this.tools.formatDate(this.form.value.modificationDay)
    }
    if (this.form.value.newPosition && this.form.value.newPosition !== "") {
      model.position = this.form.value.position
    }
    this.employeeUseCase.updateEmployee(model).subscribe(result => {
      if ("name" in result && "id" in result) {
        this._snackBar.open(`Employee updated successfully`, "", {
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
