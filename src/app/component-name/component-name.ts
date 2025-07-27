import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service'; // yol doğruysa bu

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.html',
  styleUrls: ['./component-name.css']
})
export class ComponentNameComponent implements OnInit {

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
  }

}
