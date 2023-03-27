import {ILiquidationModel, ILiquidationPageResponse, ILiquidationRequestModel} from "../liquidation/liquidation.model";
import {Observable} from "rxjs";
import {IResponseExceptionModel} from "../exceptions/exception.model";
import {IPaginationLiquidationModel} from "../pagination/pagination.model";

export abstract class LiquidationGateway{

  abstract createLiquidationOfEmployee(model : ILiquidationRequestModel)
    : Observable<ILiquidationModel | IResponseExceptionModel | IResponseExceptionModel[]>;

  abstract findLiquidationOfEmployee(id : string)
    : Observable<ILiquidationModel | IResponseExceptionModel | IResponseExceptionModel[]>;

  abstract findLiquidations(model  : IPaginationLiquidationModel)
    : Observable<ILiquidationPageResponse | IResponseExceptionModel | IResponseExceptionModel[]>;

}
