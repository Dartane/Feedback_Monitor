import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  Appointment,
  AppointmentCreationRequest,
  Doctor,
  Engineer,
  DoctorForm,
  Receipt,
  Schedule,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private doctorToEditSource = new BehaviorSubject<Doctor | null>(null);
  doctorToEdit$ = this.doctorToEditSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  setDoctorToEdit(doctor: Doctor) {
    this.doctorToEditSource.next(doctor);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get('/api/admin/engineers', {
      headers: this.getHeaders(),
    });
  }

  getAllDoctorsName(): Observable<any> {
    return this.http.get('/api/admin/engineersnames', {
      headers: this.getHeaders(),
    });
  }

  addDoctor(doctorData: DoctorForm): Observable<any> {
    return this.http.post('/api/admin/doctor-add', doctorData, {
      headers: this.getHeaders(),
    });
  }

  deleteDoctor(doctorId: string): Observable<any> {
    return this.http.delete(`/api/admin/doctor/${doctorId}`, {
      headers: this.getHeaders(),
    });
  }

  updateDoctor(doctorData: DoctorForm): Observable<any> {
    return this.http.put(`/api/admin/doctor/${doctorData.doctor_id}`, doctorData, {
      headers: this.getHeaders(),
    });
  }

  getAllSchedules(): Observable<any> {
    return this.http.get('/api/admin/doctor-schedules', {
      headers: this.getHeaders(),
    });
  }

  getDoctorById(doctorId: number): Observable<any> {
    console.log('aboba');
    return this.http.get(`/api/admin/doctor/${doctorId}`, {
      headers: this.getHeaders(),
    });
  }

  getEngFeedTableById(id_eng: number): Observable<any> {
    return this.http.get(`/api/admin/engfeedtable/${id_eng}`,{
      headers: this.getHeaders(),
    });
  }


  createSchedule(scheduleData: any): Observable<any> {
    return this.http.post('/api/admin/schedule-create', scheduleData, {
      headers: this.getHeaders(),
    });
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(`/api/admin/doctor-schedule/${scheduleId}`, {
      headers: this.getHeaders(),
    });
  }

  uploadDoctorsExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post('/api/admin/upload-doctors-excel', formData, {
      headers: this.getHeaders(),
    });
  }
}
