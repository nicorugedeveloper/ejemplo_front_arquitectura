import {Observable} from "rxjs";
import {ISalaryModel} from "../salary/salary.model";
import {IResponseExceptionModel} from "../exceptions/exception.model";

export abstract class SalaryGateway{

  abstract modificationSalariesEmployee(id : string)
    : Observable<ISalaryModel[] | IResponseExceptionModel | IResponseExceptionModel[]>;
}
