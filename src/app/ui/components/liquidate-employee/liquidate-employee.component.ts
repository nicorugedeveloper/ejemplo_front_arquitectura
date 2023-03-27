import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeUseCase} from "../../../domain/usecase/employee.usecase";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {ValidationsUseCase} from "../../../domain/usecase/validations.usecase";
import {ToolsUseCase} from "../../../domain/usecase/tools.usecase";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUpdateEmployeeModel} from "../../../domain/models/employee/employee.model";
import {LiquidationUseCase} from "../../../domain/usecase/liquidation.usecase";
import {ILiquidationModel, ILiquidationRequestModel} from "../../../domain/models/liquidation/liquidation.model";

@Component({
  selector: 'app-liquidate-employee',
  templateUrl: './liquidate-employee.component.html',
  styleUrls: ['./liquidate-employee.component.css']
})
export class LiquidateEmployeeComponent implements OnInit {

  form: FormGroup;

  id: string;
  withdrawals: any[] = [
    {value: 'RETIRO VOLUNTARIO', viewValue: 'VOLUNTARY WITHDRAWAL'},
    {value: 'RETIRO JUSTIFICADO', viewValue: 'JUSTIFIED WITHDRAWAL'},
    {value: 'RETIRO INJUSTIFICADO', viewValue: 'UNJUSTIFIED WITHDRAWAL'},
  ];

  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private liquidationUseCase: LiquidationUseCase,
              private errors: ErrorsUseCase,
              private validation : ValidationsUseCase,
              private tools: ToolsUseCase,
              @Inject(MAT_DIALOG_DATA) public data: {id: string},
              private dialogRef: MatDialogRef<LiquidateEmployeeComponent>) {
    this.form = this.formBuilder.group({
      withdrawalReason: ["", [Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      contractEnd: ["", Validators.compose([Validators.required, this.validation.startDateRange])]

    })

    this.id = data.id;


  }

  ngOnInit(): void {
  }

  liquidateEmployee() {
    let model: ILiquidationRequestModel = {
      employeeId: this.id,
      withdrawalReason: this.form.value.withdrawalReason,
      contractEnd: this.tools.formatDate(this.form.value.contractEnd)
    }
    this.liquidationUseCase.createLiquidationOfEmployee(model).subscribe(result => {
      if ("employeeId" in result && "withdrawalReason" in result) {
        this._snackBar.open(`Employee successfully terminated`, "", {
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
