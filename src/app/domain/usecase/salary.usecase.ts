import {Injectable} from "@angular/core";
import {SalaryGateway} from "../models/gateways/salary.gateway";
import {Observable, of} from "rxjs";
import {ISalaryModel} from "../models/salary/salary.model";
import {IResponseExceptionModel} from "../models/exceptions/exception.model";
import {catchError} from "rxjs/operators";


@Injectable()
export class SalaryUseCase {
  constructor(private salaryGateway: SalaryGateway) {
  }

  modificationSalariesEmployee(id : string)
    : Observable<ISalaryModel[] | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.salaryGateway.modificationSalariesEmployee(id).pipe(
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
