import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EmployeesComponent} from "./employees/employees.component";
import {LiquidationComponent} from "./liquidation/liquidation.component";

const routes: Routes = [
  { path: "", children: [
      { path: "", component: HomeComponent },
      { path: "employees", component: EmployeesComponent },
      { path: "liquidation", component: LiquidationComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
