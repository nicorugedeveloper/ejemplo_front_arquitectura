import {Injectable} from "@angular/core";
import {IResponseExceptionModel} from "../models/exceptions/exception.model";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class ErrorsUseCase {

  constructor(private _snackBar: MatSnackBar,) {
  }

  public error(error: any | IResponseExceptionModel | IResponseExceptionModel[]) {
    if (Array.isArray(error)) {
      let message = "";
      for (let err of error) {
        message = message.concat(`${err.message}\n\n`);
      }
      this._snackBar.open(`${message}`, "", {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    } else if ("message" in error) {
      this._snackBar.open(`${error.message}`, "", {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "top"
      });
    } else {
      this._snackBar.open("An error occurred while saving the employee", "",
        {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
    }
  }

}
