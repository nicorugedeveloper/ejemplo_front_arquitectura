
export interface IPaginationEmployeeModel {
  minRangeSalary? : number;
  maxRangeSalary? : number;
  recordsPerPage? : number;
  page : number;
}

export interface IPaginationLiquidationModel{
  /**
   * date format "yyyy-dd-MM"
   */
  minRangeDate? : string;
  /**
   * date format "yyyy-dd-MM"
   */
  maxRangeDate? : string;
  recordsPerPage? : number;
  page : number;
}

