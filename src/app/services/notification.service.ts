import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        console.log('Bildirim izni:', permission);
      });
    }
  }

  showNotification(title: string, message: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: 'assets/Brisa.webp'  // ikon göstermek istersen
      });
    }
  }
}
