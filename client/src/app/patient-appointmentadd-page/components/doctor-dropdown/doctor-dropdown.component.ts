import { Component } from '@angular/core';
import { finished_works } from 'src/app/shared/interfaces';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-doctor-dropdown',
  templateUrl: './doctor-dropdown.component.html',
  styleUrls: ['./doctor-dropdown.component.scss'],
})
export class DoctorDropdownComponent {
  finished_works: finished_works[] = [];
  selectedWorkId: number | undefined;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks(): void {
    this.patientService.getAllFinish().subscribe({
      next: (finished_works) => {
        this.finished_works = finished_works;
      },
      error: (error) => {
        console.error('Error fetching finished_works', error);
      },
    });
  }

 /* onDoctorChange(): void {
    if (this.selectedWorkId) {
      this.patientService.getDoctorSchedule(this.selectedWorkId).subscribe({
        next: (responce) => {


          this.schedules = responce;
          

          console.log(this.schedules)
         
        },
        error: (error) => {
          console.error('Error fetching doctor schedules', error);
        },
      });
    }
  }


  
  onScheduleChange(): void {
    if (this.selectedScheduleId) {
      // Ваш код здесь, например:
      console.log('Selected schedule ID:', this.selectedScheduleId);
      // Возможно тебе нужно как-то обработать selectedScheduleId, возможно,
      // отправлять его на сервер или что-то ещё.
    }
  }
*/

}
