export interface  ILiquidationModel{
  id? : string;
  employeeName : string;
  employeeId : string;
  employeePosition : string;
  employeeState : boolean;
  lastSalary : number;
  transportationAllowance : number;
  /**
   * date format "yyyy-dd-MM"
   */
  employeeContractStart : string;
  /**
   * date format "yyyy-dd-MM"
   */
  employeeContractEnd : string;
  withdrawalReason : string;
  totalDaysWorked : number;
  daysWorkedCurrentYear : number;
  vacationDaysToBeTaken : number;
  daysWorkedLastSixMonths : number;
  baseSettlementSalary : number;
  severancePay : number;
  vacationPay : number;
  interestSeverancePay : number;
  serviceBonus : number;
  payrollPayable : number;
  bonusUnjustifiedDismissal : number;
  totalSettlement : number;
}

export interface ILiquidationPageResponse{
  totalPages : number;
  results : number;
  remainingResults : number;
  liquidationPaymentResponseDTO?: ILiquidationModel[];
}

export interface ILiquidationRequestModel{
  employeeId : string;
  withdrawalReason : string;
  /**
   * date format "yyyy-dd-MM"
   */
  contractEnd : string
}
