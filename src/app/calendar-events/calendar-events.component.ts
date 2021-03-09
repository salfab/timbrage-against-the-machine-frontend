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

}
