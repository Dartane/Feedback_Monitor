import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Engineer, Feedbackrecord, ScheduleData, TimeInterval } from 'src/app/shared/interfaces';
import { AdminService } from 'src/app/shared/services/admin.service';
//const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;

@Component({
  selector: 'app-admin-dashboard-doctors-create-schedule-form',
  templateUrl: './admin-dashboard-doctors-create-schedule-form.component.html',
  styleUrls: ['./admin-dashboard-doctors-create-schedule-form.component.scss'],
})

//@ViewChild(AdminDashboardChartComponent) adminDashboardChart!: AdminDashboardChartComponent;
export class AdminDashboardDoctorsCreateScheduleFormComponent {
  id_eng: number | undefined;
  infocard: Feedbackrecord | null = null; 
  dataSource: Object;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
    
  ) {
    const chartData = [
      {
        label: "5",
        value: "3"
      },
      {
        label: "4",
        value: "0"
      },
      {
        label: "3",
        value: "1"
      },
      {
        label: "2",
        value: "0"
      },
      {
        label: "1",
        value: "0"
      }
    ];
    // STEP 3 - Chart Configuration
    const dataSource = {
      chart: {
        //Set the chart caption
        caption: "Отчет по оценкам",
        //Set the chart subcaption
        subCaption: "по общим оценкам",
        //Set the x-axis name
        xAxisName: "Оценки",
        //Set the y-axis name
        yAxisName: "кол-во",
        numberSuffix: "",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
  }

  ngOnInit() {
    console.log("ngOnInit");
    //console.log(this.infocard);
    this.id_eng = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id_eng);
    this.loadfeedback();
   
  }

  loadfeedback() {
    console.log("loadMedcard");
    if (this.id_eng) {
      this.adminService.getEngFeedTableById(this.id_eng).subscribe({
        next: (data) => {
          this.infocard = data;
        },
        error: (error) => {
          console.error('Error fetching loadfeedback', error);
          this.infocard = null; // Обработка отсутствия данных
          return;
        }})
      }
      return;
  }

  /*
  loadchart() {

    const chartData = [
      {
        label: "5",
        value: this.infocard?.count_mark_5
      },
      {
        label: "4",
        value: ""
      },
      {
        label: "3",
        value: ""
      },
      {
        label: "2",
        value: ""
      },
      {
        label: "1",
        value: ""
      },
      {
        label: "UAE",
        value: ""
      },
      {
        label: "US",
        value: ""
      },
      {
        label: "China",
        value: ""
      }];
    const dataSource = {
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
    console.log("loadchart");
  }
  
}
*/
/*
export class AppComponent {
 
}


  loadMedcard() {
    console.log("loadMedcard");
    if (this.id_eng) {
      this.adminService.getEngFeedTableById(this.id_eng).subscribe({
        next: (data) => {
          this.infocard = data;
        },
        error: (error) => {
          console.error('Error fetching medcard', error);
          this.infocard = null; // Обработка отсутствия данных
        }})
      }
      return;
    }

  loadDoctorInfo(id_eng: number) {
    this.adminService.getDoctorById(doctorId).subscribe({
      next: (doctor) => {
        this.doctorName = doctor.name;
        // Здесь можно дополнительно обработать остальные данные врача, если они вам нужны
      },
      error: (error) => {
        console.error('Error fetching doctor info', error);
        // Обработка ошибок, например, отображение сообщения об ошибке
      },
    });
  }
  addTimeInterval() {
    this.scheduleData.startTimes.push(''); // Добавление пустого начального времени
    this.scheduleData.endTimes.push(''); // Добавление пустого конечного времени
  }

  onSubmit() {
    const scheduleDataToSend = {
      doctorId: this.doctorId,
      date: this.scheduleData.date,
      startTimes: this.scheduleData.startTimes,
      endTimes: this.scheduleData.endTimes,
    };

    this.adminService.createSchedule(scheduleDataToSend).subscribe({
      next: (response) => {
        console.log('Расписание успешно создано', response);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        console.error('Ошибка при создании расписания', error);
      },
    });*/
  }
