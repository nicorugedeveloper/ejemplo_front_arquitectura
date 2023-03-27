import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import {IEmployeeModel, IEmployeePageResponse} from "../../../domain/models/employee/employee.model";

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new employee', () => {
    const mockEmployee : IEmployeeModel = {
      name: 'John Doe',
      id: "301235468",
      currentSalary: 1500000,
      contractStart: "2015/06/06"
    };

    service.createEmployee(mockEmployee).subscribe(response => {
      expect(response).toEqual(mockEmployee);
    });
  });

  it('should find an employee', () => {
    const mockEmployee : IEmployeeModel = {
      name: 'John Doe',
      id: "301235468",
      currentSalary: 1500000,
      contractStart: "2015/06/06"
    };

    service.findEmployee("301235468").subscribe(response => {
      expect(response).toEqual(mockEmployee);
    });
  });

  it('should find employee by salary range', () => {
    const mockEmployee : IEmployeeModel = {
      name: 'John Doe',
      id: "301235468",
      currentSalary: 1500000,
      contractStart: "2015/06/06"
    };
    const mockResult : IEmployeePageResponse = {
      results : 1,
      totalPages: 1,
      employees  : Array.of(mockEmployee),
      remainingResults  :  1
    }

    service.findEmployeeBySalaryRange({page: 1}).subscribe(response => {
      expect(response).toEqual(mockResult);
    });
  });
});
