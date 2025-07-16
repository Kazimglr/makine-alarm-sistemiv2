import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlarmService, Alarm } from './services/alarm.service'; // DİKKAT: DOSYA YOLU BURADA DOĞRU OLMALI!

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

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    this.alarmService.getAlarms().subscribe((data: Alarm[]) => {
      this.alarms = data;
    });
  }
}
