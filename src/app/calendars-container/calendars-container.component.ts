import { CalendarEvent } from './../model/calendar-event';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TeamsApiService } from '../teams-api.service';
import { MeetingsUpdated } from '../model/meetings-updated';
import { AssignedMeeting } from '../model/assigned-meeting';
import { TimeRange } from '../model/time-range';

@Component({
    selector: 'app-calendars-container',
    templateUrl: './calendars-container.component.html',
    styleUrls: ['./calendars-container.component.scss']
})
export class CalendarsContainerComponent implements OnInit, OnChanges {
    @Input()
    public accessToken: string = "";

    @Input()
    public assignedMeetings: Array<AssignedMeeting> = []

    @Input()
    public timeRange!: TimeRange;

    @Output() close: EventEmitter<MeetingsUpdated> = new EventEmitter();  @Output() meetingsUpdated: EventEmitter<MeetingsUpdated> = new EventEmitter();

    public calendarEvents: Array<CalendarEvent> = [];
    constructor(private readonly teamsApi: TeamsApiService) { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['accessToken']) {
            console.log(`access token: ${changes['accessToken'].currentValue}`);
            this.refreshCalendarEvents();
        }

        if (changes['timeRange']) {
            debugger
            this.refreshCalendarEvents();
        }

        if (changes['assignedMeetings']) {
            this.calendarEvents = this.calendarEvents.filter(o => this.assignedMeetings.findIndex(am => am.meeting.objectId === o.objectId) == -1)
        }

    }

    ngOnInit(): void {
        this.refreshCalendarEvents();
    }

    private refreshCalendarEvents() {
        this.teamsApi.getCalendarEvents(this.accessToken, this.timeRange.startDate, this.timeRange.endDate)
        .subscribe(o => {
            // TODO : Create constants for the whole application and start using them, including here.
            const inOfficeMeetings = o.value.filter(o => o.showAs != 'Oof');
            this.calendarEvents = inOfficeMeetings;
            this.meetingsUpdated.emit(new MeetingsUpdated(inOfficeMeetings));
        });
    }
}
