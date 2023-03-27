import {IEmployeeModel, IEmployeePageResponse, IUpdateEmployeeModel} from "../employee/employee.model";
import {Observable} from "rxjs";
import {IResponseExceptionModel} from "../exceptions/exception.model";
import {IPaginationEmployeeModel} from "../pagination/pagination.model";

export abstract class EmployeeGateway{
  abstract createEmployee(model : IEmployeeModel)
    : Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>;

  abstract updateEmployee(model : IUpdateEmployeeModel)
    : Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>;

  abstract findEmployee(id : string) : Observable<IEmployeeModel | IResponseExceptionModel | IResponseExceptionModel[]>;

  abstract findEmployeeBySalaryRange(model : IPaginationEmployeeModel)
    : Observable<IEmployeePageResponse | IResponseExceptionModel | IResponseExceptionModel[]>;
}
