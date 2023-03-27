import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {PagesModule} from "../pages/pages.module";
import {ComponentsModule} from "../components/components.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PagesModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
