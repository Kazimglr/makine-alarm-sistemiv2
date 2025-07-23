import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmService, Alarm } from './services/alarm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'makine-alarm-sistemiv2';
  alarms: Alarm[] = [];
  visibleAlarms: Alarm[] = [];
  totalMachines: number = 120;
  workingMachines: number = 0;
  faultyMachines: number = 0;
  currentIndex: number = 0;
  intervalId: any;

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    this.alarmService.getAlarms().subscribe((data: Alarm[]) => {
      this.alarms = data.filter(alarm =>
        alarm.faultReason?.trim() !== '' && alarm.faultTime?.trim() !== ''
      );
      this.faultyMachines = this.alarms.length;
      this.workingMachines = this.totalMachines - this.faultyMachines;
      this.currentIndex = 0;    // Başlangıçta sıfırdan başlat
      this.updateVisibleAlarms();

      // Intervali baştan kur, önceki varsa temizle (yeniden veri çekilirse sorun olmasın)
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.nextGroup(), 20000);
    });
  }

  updateVisibleAlarms() {
    // 4’erli gruplar şeklinde gösterilecek alarmları belirle
    const start = this.currentIndex;
    if (this.alarms.length <= 4) {
      // Eğer toplam alarm 4 veya daha az ise tümünü göster
      this.visibleAlarms = this.alarms.slice(0, 4);
    } else {
      // 4’lü grup, gerekirse baştan ekle
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
}
