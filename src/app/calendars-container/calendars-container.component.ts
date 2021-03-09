import { CalendarEvent } from './../model/calendar-event';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamsApiService } from '../teams-api.service';

@Component({
    selector: 'app-calendars-container',
    templateUrl: './calendars-container.component.html',
    styleUrls: ['./calendars-container.component.scss']
})
export class CalendarsContainerComponent implements OnInit, OnChanges {
    @Input()
    public accessToken: string = "";

    public calendarEvents: Array<CalendarEvent> = [];
    constructor(private readonly teamsApi: TeamsApiService) { }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(`access token: ${changes['accessToken'].currentValue}`);
        this.refreshCalendarEvents();

    }

    ngOnInit(): void {
        this.refreshCalendarEvents();
    }


    private refreshCalendarEvents() {
        this.teamsApi.getCalendarEvents(this.accessToken).subscribe(o => {
            this.calendarEvents = o.value;
        });
    }
}
