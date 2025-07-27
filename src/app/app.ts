import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlarmService, Alarm } from './services/alarm.service';
import { SignalRService } from './services/signalr.service';
import { NotificationService } from './services/notification.service';

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
  latestAlarm: Alarm | null = null;
  totalMachines: number = 120; // db.json’den veya API'den alınacaksa güncelle
  workingMachines: number = 0;
  faultyMachines: number = 0;
  currentDate: Date = new Date();

constructor(
  private alarmService: AlarmService,
  private signalRService: SignalRService, // BUNU EKLE!
  private notificationService: NotificationService // ✅ BUNU EKLE
) {}
showToast: boolean = false;
toastAlarm: Alarm | null = null;

  ngOnInit() {
  this.notificationService.requestPermission(); // 🔔 Bu satır eklenmeli

    this.signalRService.startConnection(); // 🔥 BURAYI EKLE
    
    this.signalRService.alarm$.subscribe((alarm: Alarm | null) => {
  if (alarm) {
    this.latestAlarm = alarm;

    // Toast bildirimi göster
    this.toastAlarm = alarm;
    this.showToast = true;

    // 4 saniye sonra kaybolsun
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
});

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
