import { Component, ViewChild } from '@angular/core';
import { FeedbackClient} from '../shared/interfaces';
import { PatientService } from '../shared/services/patient.service';
import { DoctorDropdownComponent } from './components/doctor-dropdown/doctor-dropdown.component';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-patient-appointmentadd-page',
  templateUrl: './patient-appointmentadd-page.component.html',
  styleUrls: ['./patient-appointmentadd-page.component.scss']
})
export class PatientAppointmentaddPageComponent {


constructor(private patientService: PatientService, private router:Router) {}

@ViewChild(DoctorDropdownComponent) doctorDropdownComponent!: DoctorDropdownComponent;
text_mark: string = '';
communication_mark:number = 0;
prof_mark:number = 0;
speed_mark:number = 0;
full_mark:number = 0;
ngOnInit(): void {


}



onSubmit(): void {
  const selectedWorkId = this.doctorDropdownComponent.selectedWorkId;
  const communication_mark = this.communication_mark;
  const prof_mark = this.prof_mark;
  const speed_mark = this.speed_mark;
  const full_mark = this.full_mark;
  const text_mark = this.text_mark;
  
  
  if (selectedWorkId) {
    const appointmentData: FeedbackClient = {
      id_work: selectedWorkId,
      communication_mark: communication_mark,
      prof_mark: prof_mark,
      speed_mark: speed_mark,
      full_mark: full_mark,
      text_mark: text_mark
    };
    console.log(appointmentData);

    this.patientService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        alert('Feedback created successfully');
        this.router.navigate(['/patient-dashboard']);
      },
      error: (error) => {
        console.error('Error creating Feedback', error);
        // Обработка ошибки
      }
    });
  }
  

  
}


}






