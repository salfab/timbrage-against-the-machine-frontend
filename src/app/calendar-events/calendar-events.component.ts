import { CalendarEvent } from './../model/calendar-event';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss']
})
export class CalendarEventsComponent implements OnInit {

  @Input()
  public events: Array<CalendarEvent> = [];


  constructor() { }

  ngOnInit(): void {
  }

  public getDurationInMinutes(event: CalendarEvent) {
    const endTime = new Date(event.endTime);
    const startTime = new Date(event.startTime);
    const duration = ( endTime.valueOf() - startTime.valueOf()) / 60000;
    
    return duration;
  }

}
