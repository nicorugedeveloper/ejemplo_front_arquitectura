import { Injectable } from '@angular/core';
import {LiquidationGateway} from "../../../domain/models/gateways/liquidation.gateway";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {
  ILiquidationModel,
  ILiquidationPageResponse,
  ILiquidationRequestModel
} from "../../../domain/models/liquidation/liquidation.model";
import {Observable, of} from "rxjs";
import {IResponseExceptionModel} from "../../../domain/models/exceptions/exception.model";
import {IPaginationLiquidationModel} from "../../../domain/models/pagination/pagination.model";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LiquidationService extends LiquidationGateway{

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  private apiUrl = "/api/employee/liquidation";
  constructor(private http: HttpClient) {
    super()
  }

  createLiquidationOfEmployee(model: ILiquidationRequestModel): Observable<ILiquidationModel
    | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.post<ILiquidationModel | IResponseExceptionModel |
      IResponseExceptionModel[]>(this.apiUrl, model, {headers : this.httpHeaders}).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  findLiquidationOfEmployee(id: string): Observable<ILiquidationModel | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.get<ILiquidationModel | IResponseExceptionModel |
      IResponseExceptionModel[]>(`${this.apiUrl}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  findLiquidations(model: IPaginationLiquidationModel): Observable<ILiquidationPageResponse | IResponseExceptionModel | IResponseExceptionModel[]> {
    return this.http.post<ILiquidationPageResponse | IResponseExceptionModel |
      IResponseExceptionModel[]>(`${this.apiUrl}/date-range`, model, {headers : this.httpHeaders}).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
