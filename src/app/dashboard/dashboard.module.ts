import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    ContactUsComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
