import { Component } from '@angular/core';
import { Engineer, Feedback } from 'src/app/shared/interfaces';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin-dashboard-schedules',
  templateUrl: './admin-dashboard-schedules.component.html',
  styleUrls: ['./admin-dashboard-schedules.component.scss'],
})
export class AdminDashboardSchedulesComponent {
  feedback: Feedback[] = [];
  engineers: any[] = [];
  selectedEngId: number | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadFeedbackin();
    this.loadEng();
  }

  loadFeedbackin() {
    this.adminService.getAllSchedules().subscribe({
      next: (data) => {
        this.feedback = data.feedback;
      },
      error: (error) => {
        console.error('Error fetching feedback', error);
      },
    });
  }

  loadEng() {
    this.adminService.getAllDoctorsName().subscribe({
      next: (data) => {
        this.engineers = data;
      },
      error: (error) => {
        console.error('Error fetching engineers', error);
      },
    });
  }

  getFilteredSchedules() {
    if (this.selectedEngId === null) {
      return this.feedback;
    }
    return this.feedback.filter(feedback => feedback.id_eng === this.selectedEngId);
  }

  /*
  deleteSchedule(scheduleId: number) {
    this.adminService.deleteSchedule(scheduleId).subscribe({
      next: (response) => {
        console.log('Талон успешно удален', response);
        this.loadSchedules();
      },
      error: (error) => {
        console.error('Ошибка при удалении талона', error);
      }
    });
  }
  */

}
