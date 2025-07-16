import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlarmService, Alarm } from './services/alarm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [DatePipe]
})
export class App implements OnInit {
  title = 'makine-alarm-sistemiv2';
  alarms: Alarm[] = [];
  totalMachines: number = 120; // db.json’den veya API'den alınacaksa güncelle
  workingMachines: number = 0;
  faultyMachines: number = 0;
  currentDate: Date = new Date();

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    this.alarmService.getAlarms().subscribe((data: Alarm[]) => {
      // Sadece faultReason ve faultTime boş olmayanları filtrele
      this.alarms = data.filter(alarm =>
        alarm.faultReason?.trim() !== '' && alarm.faultTime?.trim() !== ''
      );

      this.faultyMachines = this.alarms.length; // Arızalı makine sayısı
      this.workingMachines = this.totalMachines - this.faultyMachines; // Çalışan makine sayısı
    });

    // İstersen buraya interval ekleyip currentDate güncelleyebilirsin:
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
