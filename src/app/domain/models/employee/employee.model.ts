export interface IEmployeeModel{
  id? : string;
  name : string;
  /**
   * date format "yyyy-dd-MM"
   */
  contractStart : string;
  position? : string;
  currentSalary : number;
  state? : boolean;
  /**
   * date format "yyyy-dd-MM"
   */
  lastSalaryUpdated? : string;
}



export interface IUpdateEmployeeModel{
  id: string;
  position? : string;
  updateSalary : number;

  /**
   * date format "yyyy-dd-MM"
   */
  modificationDate : string
}

export interface IEmployeePageResponse{
  totalPages : number;
  results : number;
  remainingResults : number;
  employees?: IEmployeeModel[];
}



