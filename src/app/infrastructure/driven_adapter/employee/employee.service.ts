import { Injectable } from '@angular/core';
import {EmployeeGateway} from "../../../domain/models/gateways/employee.gateway";
import {
  IEmployeeModel,
  IEmployeePageResponse,
  IUpdateEmployeeModel
} from "../../../domain/models/employee/employee.model";
import {Observable, of} from "rxjs";
import {IResponseExceptionModel} from "../../../domain/models/exceptions/exception.model";
import {IPaginationEmployeeModel} from "../../../domain/models/pagination/pagination.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EmployeeGateway{

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  private apiUrl = "/api/employee";

  constructor(public http : HttpClient) {
    super();
  }

  createEmployee(model: IEmployeeModel): Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.post<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>(this.apiUrl, model, { headers: this.httpHeaders })
      .pipe(
        catchError((error: HttpErrorResponse) => {
            return of(error.error);
        })
      );
  }

  findEmployee(id: string): Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.get<IEmployeeModel | IResponseExceptionModel |
      IResponseExceptionModel[]>(`${this.apiUrl}/${id}`, {
        headers : this.httpHeaders
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  findEmployeeBySalaryRange(model: IPaginationEmployeeModel): Observable<IEmployeePageResponse | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.post<IEmployeePageResponse | IResponseExceptionModel |
      IResponseExceptionModel[]>(`${this.apiUrl}/salary-range`, model, {
        headers: this.httpHeaders,
      }).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  updateEmployee(model: IUpdateEmployeeModel): Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.put<IEmployeeModel | IResponseExceptionModel |
      IResponseExceptionModel[]>(this.apiUrl, model, {headers : this.httpHeaders}).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
