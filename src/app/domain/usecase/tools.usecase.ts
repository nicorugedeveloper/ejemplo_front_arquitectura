import {Injectable} from "@angular/core";

@Injectable()
export class ToolsUseCase{
  public formatDate(date: string): string {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();

    let fMonth: string = month.toString()
    let fDay: string = day.toString()
    if (month < 10) {
      fMonth = '0' + month.toString();
    }
    if (day < 10) {
      fDay = '0' + day.toString();
    }

    return `${year}/${fDay}/${fMonth}`;
  }
}
