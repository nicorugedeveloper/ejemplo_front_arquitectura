import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeUseCase} from "../../../domain/usecase/employee.usecase";
import {IPaginationEmployeeModel} from "../../../domain/models/pagination/pagination.model";
import {IEmployeeModel} from "../../../domain/models/employee/employee.model";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";
import {SalaryHistoryComponent} from "../salary-history/salary-history.component";
import {EmployeeInformationComponent} from "../employee-information/employee-information.component";
import {LiquidateEmployeeComponent} from "../liquidate-employee/liquidate-employee.component";


@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrls: ['./table-employee.component.css']
})
export class TableEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['identification', 'name', 'salary', 'state', 'actions'];
  employee: IEmployeeModel[] = [];
  dataSource = new MatTableDataSource<IEmployeeModel>(this.employee);


  page : number = 1;
  totalPages : number = 1;

  recordsPage : number = 5;
  minSalary : number = 1160000;
  maxSalary : number = 7000000;


  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private employeeUseCase: EmployeeUseCase,
              public dialog: MatDialog,
              private errors: ErrorsUseCase) {
  }

  ngOnInit(): void {
    this.findEmployees({ page: 1 });
  }

  findEmployees(model: IPaginationEmployeeModel) {

    this.employeeUseCase.findEmployeeBySalaryRange(model).subscribe(result => {
      if (result && "totalPages" in result && "results" in result && result.employees) {
        this.employee = result.employees;
        this.dataSource.data = result.employees;
        this.totalPages = result.totalPages;
      } else {
        this.errors.error(result);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nextPage(){
    if (this.page < this.totalPages) {
      this.page += 1;
      let model: IPaginationEmployeeModel = {
        recordsPerPage: this.recordsPage,
        page: this.page
      };
      this.findEmployees(model);
    }
  }

  afterPage(){
    if (this.page > 1) {
      this.page -= 1;
      let model: IPaginationEmployeeModel = {
        recordsPerPage: this.recordsPage,
        page: this.page
      };
      this.findEmployees(model);
    }
  }


  onRecordsPageChange(){
    let model: IPaginationEmployeeModel = {
      maxRangeSalary: this.maxSalary <= 7000000 && this.maxSalary >= 1160000 ? this.maxSalary : 7000000,
      minRangeSalary: this.minSalary <= 7000000 && this.minSalary >= 1160000 ? this.minSalary : 7000000,
      recordsPerPage: this.recordsPage,
      page: this.page
    }
    this.findEmployees(model);
  }

  edit(id : number) : void{
    this.dialog.open(UpdateEmployeeComponent, {
      data: { id : id.toString() }
    });
  }

  salaryHistory(id : number) : void{
    this.dialog.open(SalaryHistoryComponent, {
      data: { id : id.toString() }
    });
  }

  detailsEmployee(id : number) : void{
    this.dialog.open(EmployeeInformationComponent, {
      data: { id : id.toString() }
    });
  }

  liquidateEmployee(id : number) : void{
    this.dialog.open(LiquidateEmployeeComponent, {
      data: { id : id.toString() }
    });
  }


}
