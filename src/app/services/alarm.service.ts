import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Alarm {
  nodeName: string;
  tagDescr: string;
}


@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private apiUrl = 'http://localhost:7120/api/AlarmData/filtered';


  constructor(private http: HttpClient) {}

  getAlarms(): Observable<Alarm[]> {
    return this.http.get<Alarm[]>(this.apiUrl);
  }
 
}
