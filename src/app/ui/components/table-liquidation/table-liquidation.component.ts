import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {IPaginationLiquidationModel} from "../../../domain/models/pagination/pagination.model";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";
import {SalaryHistoryComponent} from "../salary-history/salary-history.component";
import {EmployeeInformationComponent} from "../employee-information/employee-information.component";
import {ILiquidationModel} from "../../../domain/models/liquidation/liquidation.model";
import {LiquidationUseCase} from "../../../domain/usecase/liquidation.usecase";
import {ToolsUseCase} from "../../../domain/usecase/tools.usecase";
import {LiquidationInformationComponent} from "../liquidation-information/liquidation-information.component";

@Component({
  selector: 'app-table-liquidation',
  templateUrl: './table-liquidation.component.html',
  styleUrls: ['./table-liquidation.component.css']
})
export class TableLiquidationComponent implements OnInit {
  displayedColumns: string[] = ['identification', 'name', 'daysWorked', 'salary', 'actions'];
  liquidation: ILiquidationModel[] = [];
  dataSource = new MatTableDataSource<ILiquidationModel>(this.liquidation);


  page: number = 1;
  totalPages: number = 1;

  recordsPage: number = 5;
  minDate: Date = new Date('2015-01-02');
  maxDate: Date = new Date('2030-01-02');


  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private liquidationUseCase: LiquidationUseCase,
              public dialog: MatDialog,
              private tools: ToolsUseCase,
              private errors: ErrorsUseCase) {
  }

  ngOnInit(): void {
    this.findLiquidations({page: 1});
  }

  findLiquidations(model: IPaginationLiquidationModel) {
    this.liquidationUseCase.findLiquidations(model).subscribe(result => {
      if (result && "totalPages" in result && "results" in result && result.liquidationPaymentResponseDTO) {
        this.liquidation = result.liquidationPaymentResponseDTO;
        this.dataSource.data = result.liquidationPaymentResponseDTO;
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

  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      let model: IPaginationLiquidationModel = {
        recordsPerPage: this.recordsPage,
        page: this.page
      };
      this.findLiquidations(model);
    }
  }

  afterPage() {
    if (this.page > 1) {
      this.page -= 1;
      let model: IPaginationLiquidationModel = {
        recordsPerPage: this.recordsPage,
        page: this.page
      };
      this.findLiquidations(model);
    }
  }


  onRecordsPageChange() {
    let model: IPaginationLiquidationModel = {
      maxRangeDate:
        this.maxDate?.getTime() <= new Date('2100-01-01').getTime()
        && this.maxDate?.getTime() >= new Date('2015-01-01').getTime() ?
          this.tools.formatDate(this.maxDate?.toString()) : this.tools.formatDate(new Date('2100-01-01').toString()),

      minRangeDate:
        this.minDate?.getTime() <= new Date('2100-01-01').getTime()
        && this.minDate?.getTime() >= new Date('2015-01-01').getTime() ?
          this.tools.formatDate(this.minDate?.toString()) : this.tools.formatDate(new Date('2015-01-01').toString()),

      recordsPerPage: this.recordsPage,
      page: this.page
    }
    this.findLiquidations(model);
  }


  detailsLiquidation(id: number): void {
    this.dialog.open(LiquidationInformationComponent, {
      data: {id: id.toString()}
    });
  }

}
