import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmService, Alarm } from './services/alarm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  title = 'makine-alarm-sistemiv2';
  alarms: Alarm[] = [];
  visibleAlarms: Alarm[] = [];
  totalMachines: number = 120;
  workingMachines: number = 0;
  faultyMachines: number = 0;
  currentIndex: number = 0;
  intervalId: any;
  refreshIntervalId: any;

  constructor(private alarmService: AlarmService) {}

ngOnInit() {
    this.loadAlarms(); // İlk yükleme

    // 20 saniyede bir grup güncelleme devam etsin
    this.intervalId = setInterval(() => this.nextGroup(), 20000);

    // 1 dakikada bir verileri SQL'den yeniden çek
    this.refreshIntervalId = setInterval(() => this.loadAlarms(), 60000);
  }

loadAlarms() {
  this.alarmService.getAlarms().subscribe((data: Alarm[]) => {
    console.log("Gelen veri:", data); // <-- Bunu ekle!
    this.alarms = data;
    this.faultyMachines = this.alarms.length;
    this.workingMachines = this.totalMachines - this.faultyMachines;
    this.currentIndex = 0;
    this.updateVisibleAlarms();
    console.log("Visible Alarms:", this.visibleAlarms); // <-- Bunu da ekle!
  });
}



  updateVisibleAlarms() {
    const start = this.currentIndex;
    if (this.alarms.length <= 4) {
      this.visibleAlarms = this.alarms.slice(0, 4);
    } else {
      this.visibleAlarms = this.alarms.slice(start, start + 4);
      if (this.visibleAlarms.length < 4) {
        this.visibleAlarms = this.visibleAlarms.concat(
          this.alarms.slice(0, 4 - this.visibleAlarms.length)
        );
      }
    }
  }

  nextGroup() {
    if (this.alarms.length <= 4) return;
    this.currentIndex = (this.currentIndex + 4) % this.alarms.length;
    this.updateVisibleAlarms();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.refreshIntervalId) clearInterval(this.refreshIntervalId);
  }
}
