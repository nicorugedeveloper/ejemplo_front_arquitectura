import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";

@Injectable()
export class ValidationsUseCase{


  /**
   * Validate Range of provided date
   * @param control
   */
  public dateRange(control: FormControl) {
    const date = new Date(control.value);
    const startDate = new Date('2015/01/01');
    const endDate = new Date('2023/06/06');
    if (date >= startDate && date <= endDate) {
      return null;
    } else {
      return {outOfRange: true};
    }
  }
  public startDateRange(control: FormControl) {
    const date = new Date(control.value);
    const startDate = new Date('2015/01/01');
    if (date >= startDate) {
      return null;
    } else {
      return {outOfRange: true};
    }
  }
}
