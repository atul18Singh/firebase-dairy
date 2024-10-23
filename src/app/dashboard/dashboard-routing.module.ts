import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardHomeComponent
      },
      {
        path: 'contact',
        component: AboutUsComponent
      },

      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
