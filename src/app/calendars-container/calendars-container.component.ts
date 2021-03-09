import { CalendarEvent } from './../model/calendar-event';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TeamsApiService } from '../teams-api.service';
import { MeetingsUpdated } from '../model/meetings-updated';

@Component({
    selector: 'app-calendars-container',
    templateUrl: './calendars-container.component.html',
    styleUrls: ['./calendars-container.component.scss']
})
export class CalendarsContainerComponent implements OnInit, OnChanges {
    @Input()
    public accessToken: string = "";

    @Output() close: EventEmitter<MeetingsUpdated> = new EventEmitter();  @Output() meetingsUpdated: EventEmitter<MeetingsUpdated> = new EventEmitter();

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
        this.teamsApi.getCalendarEvents(this.accessToken)
        .subscribe(o => {
            this.calendarEvents = o.value.filter(o => o.showAs != 'Oof');
            this.meetingsUpdated.emit(new MeetingsUpdated(this.calendarEvents));
        });
    }
}
