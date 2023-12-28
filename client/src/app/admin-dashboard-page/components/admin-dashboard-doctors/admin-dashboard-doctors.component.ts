import { Component } from '@angular/core';
import { Doctor, Engineer } from 'src/app/shared/interfaces';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-doctors',
  templateUrl: './admin-dashboard-doctors.component.html',
  styleUrls: ['./admin-dashboard-doctors.component.scss']
})
export class AdminDashboardDoctorsComponent {
  engineer: Engineer[] = [];

  constructor(private adminService: AdminService, private router:Router) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.adminService.getAllDoctors().subscribe(
      response => {
        this.engineer = response;
        console.log(this.engineer);
      },
      error => {
        console.error('Error fetching engineers', error);
      }
    );
  }

  openFeedback(engineer: Engineer) {
    console.log(engineer);
    this.router.navigate(['/createschedule', engineer.id_eng]);
  }

}
