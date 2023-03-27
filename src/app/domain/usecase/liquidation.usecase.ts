import {Injectable} from "@angular/core";
import {LiquidationGateway} from "../models/gateways/liquidation.gateway";
import {
  ILiquidationModel,
  ILiquidationPageResponse,
  ILiquidationRequestModel
} from "../models/liquidation/liquidation.model";
import {Observable, of} from "rxjs";
import {IResponseExceptionModel} from "../models/exceptions/exception.model";
import {IPaginationLiquidationModel} from "../models/pagination/pagination.model";
import {catchError} from "rxjs/operators";


@Injectable()
export class LiquidationUseCase{

  constructor(private liquidationGateway: LiquidationGateway) {
  }

  createLiquidationOfEmployee(model : ILiquidationRequestModel)
    : Observable<ILiquidationModel | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.liquidationGateway.createLiquidationOfEmployee(model).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

  findLiquidationOfEmployee(id : string)
    : Observable<ILiquidationModel | IResponseExceptionModel | IResponseExceptionModel[]>{
    return this.liquidationGateway.findLiquidationOfEmployee(id).pipe(
      catchError(error => {
        const errorResponse: IResponseExceptionModel = {
          status: error.status,
          message: error.message,
        };
        return of(errorResponse);
      })
    );
  }

  findLiquidations(model  : IPaginationLiquidationModel)
    : Observable<ILiquidationPageResponse | IResponseExceptionModel | IResponseExceptionModel[] | null>{
    return this.liquidationGateway.findLiquidations(model).pipe(
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
