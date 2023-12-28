import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
//import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { PatientDashboardPageComponent } from './patient-dashboard-page/patient-dashboard-page.component';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';
import { PatientDashboaedSidebarComponent } from './patient-dashboard-page/components/patient-dashboaed-sidebar/patient-dashboaed-sidebar.component';
import { CustomTimePipe } from './shared/pipes/custom-time.pipe';
import { PatientAppointmentaddPageComponent } from './patient-appointmentadd-page/patient-appointmentadd-page.component';
import { DoctorDropdownComponent } from './patient-appointmentadd-page/components/doctor-dropdown/doctor-dropdown.component';
import { AdminDashboardSidebarComponent } from './admin-dashboard-page/components/admin-dashboard-sidebar/admin-dashboard-sidebar.component';
import { AdminDashboardDoctorsComponent } from './admin-dashboard-page/components/admin-dashboard-doctors/admin-dashboard-doctors.component';
import { AdminDoctorCreatePageComponent } from './admin-doctor-create-page/admin-doctor-create-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardSchedulesComponent } from './admin-dashboard-page/components/admin-dashboard-schedules/admin-dashboard-schedules.component';
import { AdminDoctorSchedulesPageComponent } from './admin-doctor-schedules-page/admin-doctor-schedules-page.component';
import { AdminDashboardDoctorsCreateScheduleFormComponent } from './admin-dashboard-page/components/admin-dashboard-doctors-create-schedule-form/admin-dashboard-doctors-create-schedule-form.component';
import { ConfirmDialogComponent } from './shared/modal/confim-logout/confim-logout.component';
import { MatDialogModule } from '@angular/material/dialog';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    //RegisterPageComponent,
    PatientDashboardPageComponent,
    AdminDashboardPageComponent,
    PatientDashboaedSidebarComponent,
    CustomTimePipe,
    PatientAppointmentaddPageComponent,
    DoctorDropdownComponent,
    AdminDashboardSidebarComponent,
    AdminDashboardDoctorsComponent,
    AdminDoctorCreatePageComponent,
    AdminDashboardSchedulesComponent,
    AdminDoctorSchedulesPageComponent,
    AdminDashboardDoctorsCreateScheduleFormComponent,
    ConfirmDialogComponent
    
  ],
  imports: [
    FusionChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
