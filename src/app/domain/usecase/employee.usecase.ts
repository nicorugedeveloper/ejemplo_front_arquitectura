import {Injectable} from "@angular/core";
import {EmployeeGateway} from "../models/gateways/employee.gateway";
import {IEmployeeModel, IEmployeePageResponse, IUpdateEmployeeModel} from "../models/employee/employee.model";
import {Observable, of} from "rxjs";
import {IResponseExceptionModel} from "../models/exceptions/exception.model";
import {IPaginationEmployeeModel} from "../models/pagination/pagination.model";
import { catchError } from 'rxjs/operators';



@Injectable()
export class EmployeeUseCase{

  constructor(private employeeGateway : EmployeeGateway) {
  }

  createEmployee(model: IEmployeeModel):
    Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.employeeGateway.createEmployee(model).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

  updateEmployee(model : IUpdateEmployeeModel)
    : Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.employeeGateway.updateEmployee(model).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

  findEmployee(id : string) : Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.employeeGateway.findEmployee(id).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

  findEmployeeBySalaryRange(model : IPaginationEmployeeModel)
    : Observable<IEmployeePageResponse | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.employeeGateway.findEmployeeBySalaryRange(model).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

}
