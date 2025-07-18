import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Machine {
  id: number | string;
  name: string;
  faultReason: string;
  faultDetail: string;
  faultTime: string;
}
//
export interface Alarm {
  id: number;
  name: string;
  faultReason: string;
  faultDetail: string;
  faultTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private apiUrl = 'http://localhost:3000/alarms';

  constructor(private http: HttpClient) {}

  getAlarms(): Observable<Alarm[]> {
    return this.http.get<Alarm[]>(this.apiUrl + '?_limit=120');
  }
}
