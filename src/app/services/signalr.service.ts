import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Alarm } from './alarm.service'; // modelin varsa import et
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service'; // 📌 burayı ekledik

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private alarmSubject = new BehaviorSubject<Alarm | null>(null);
  public alarm$ = this.alarmSubject.asObservable();

  constructor(private notificationService: NotificationService) {} // 📌 inject ettik

  public startConnection(): void {
    console.log('🟡 SignalR bağlantısı başlatılıyor...');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7120/hubs/alarm') // URL doğruysa kalsın
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('✅ SignalR bağlantısı KURULDU!');
      })
      .catch(err => {
        console.error('❌ SignalR bağlantı HATASI:', err);
      });

    // Gelen alarmı dinle
    this.hubConnection.on('alarmAdded', (alarm: Alarm) => {
      console.log('📥 Yeni alarm ALINDI!');
      console.log('🧾 Alarm içeriği:', alarm);

     

      // 📣 Bildirim Göster
this.notificationService.showNotification(
  'Yeni Alarm: ' + alarm.name,
  'Arıza Sebebi: ' + alarm.faultReason
);

      // 🟢 Alarm'ı pushla
      this.alarmSubject.next(alarm);
    });

    this.hubConnection.onclose(error => {
      console.warn('⚠️ SignalR bağlantısı KOPTU:', error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log('🔁 SignalR YENİDEN bağlandı. ID:', connectionId);
    });

    this.hubConnection.onreconnecting(error => {
      console.log('🔄 SignalR yeniden bağlanıyor...', error);
    });
  }
}
