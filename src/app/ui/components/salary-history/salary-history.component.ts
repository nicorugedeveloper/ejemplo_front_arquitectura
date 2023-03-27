import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SalaryUseCase} from "../../../domain/usecase/salary.usecase";
import {ISalaryModel} from "../../../domain/models/salary/salary.model";

@Component({
  selector: 'app-salary-history',
  templateUrl: './salary-history.component.html',
  styleUrls: ['./salary-history.component.css']
})
export class SalaryHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'salary'];

  salary: ISalaryModel[] = [];

  id: string;

  dataSource = new MatTableDataSource<ISalaryModel>(this.salary);
  constructor(private salaryUseCase: SalaryUseCase,
              @Inject(MAT_DIALOG_DATA) public data: {id: string},
              private dialogRef: MatDialogRef<SalaryHistoryComponent>) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.findSalaryHistory(this.id);
  }

 // this.dialogRef.close();

  findSalaryHistory(id: string): void {
    this.salaryUseCase.modificationSalariesEmployee(id).subscribe(result => {
      if (Array.isArray(result)) {
        // @ts-ignore
        this.salary = result;
        this.dataSource = new MatTableDataSource<ISalaryModel>(this.salary);
      } else {
        console.log(result.message);
      }
    });
  }

}
