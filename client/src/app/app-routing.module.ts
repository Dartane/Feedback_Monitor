import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
//import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthRoleGuard } from './shared/classes/authRole.quard';
import { PatientDashboardPageComponent } from './patient-dashboard-page/patient-dashboard-page.component';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';
import { PatientAppointmentaddPageComponent } from './patient-appointmentadd-page/patient-appointmentadd-page.component';
import { AdminDoctorCreatePageComponent } from './admin-doctor-create-page/admin-doctor-create-page.component';
import { AdminDashboardSchedulesComponent } from './admin-dashboard-page/components/admin-dashboard-schedules/admin-dashboard-schedules.component';
import { AdminDoctorSchedulesPageComponent } from './admin-doctor-schedules-page/admin-doctor-schedules-page.component';
import { AdminDashboardDoctorsCreateScheduleFormComponent } from './admin-dashboard-page/components/admin-dashboard-doctors-create-schedule-form/admin-dashboard-doctors-create-schedule-form.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },

    ],
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardPageComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] },// Только для пациента
  },

  {
    path: 'appointment-add',
    component: PatientAppointmentaddPageComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [1] },
  },
  
  {
    path: 'admin-dashboard',
    component: AdminDashboardPageComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: [3] }, // Только для администраторов
  },

  {
    path: 'createschedule/:id',
    component: AdminDashboardDoctorsCreateScheduleFormComponent,
   // canActivate: [AuthRoleGuard],
   // data: { roles: [3] },
  },
  {
    path: 'schedules',
    component: AdminDoctorSchedulesPageComponent,
    canActivate:[AuthRoleGuard],
    data:{roles:[3]},

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
