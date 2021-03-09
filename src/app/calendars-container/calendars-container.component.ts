import { CalendarEvent } from './../model/calendar-event';
import { Component, Input, OnInit } from '@angular/core';
import { TeamsApiService } from '../teams-api.service';

@Component({
  selector: 'app-calendars-container',
  templateUrl: './calendars-container.component.html',
  styleUrls: ['./calendars-container.component.scss']
})
export class CalendarsContainerComponent implements OnInit {
  @Input()
  public teamsAccessToken: string = "";

  public calendarEvents: Array<CalendarEvent> = [];
  constructor(private readonly teamsApi: TeamsApiService) { }

  ngOnInit(): void {
    this.teamsApi.getCalendarEvents(this.teamsAccessToken).subscribe(o => {
      this.calendarEvents = o.value;
    });
  }

}
