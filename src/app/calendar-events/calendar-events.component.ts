import { CalendarEvent } from './../model/calendar-event';
import { Component, Input, OnInit } from '@angular/core';
import { AssignedMeeting } from '../model/assigned-meeting';

@Component({
    selector: 'app-calendar-events',
    templateUrl: './calendar-events.component.html',
    styleUrls: ['./calendar-events.component.scss']
})
export class CalendarEventsComponent implements OnInit {

    @Input()
    public events: Array<CalendarEvent> = [];

    @Input()
    public assignedMeetings: Array<AssignedMeeting> = []

    constructor() { }

    ngOnInit(): void {
    }

    public getDurationInMinutes(event: CalendarEvent) {
        const endTime = new Date(event.endTime);
        const startTime = new Date(event.startTime);
        const duration = (endTime.valueOf() - startTime.valueOf()) / 60000;

        return duration;
    }

    public drag(ev: DragEvent) {
        const targetDiv = ev.target as HTMLDivElement;
        const objectId = targetDiv.dataset["objectId"];
        const cleanGlobalObjectId = targetDiv.dataset["cleanGlobalObjectId"];

        if (ev.dataTransfer && targetDiv && objectId) {
            ev.dataTransfer.setData("objectId", objectId);
            if (cleanGlobalObjectId) {
                ev.dataTransfer.setData("cleanGlobalObjectId", cleanGlobalObjectId);
                const occurrencesObjectId = this.events.filter(o => o.cleanGlobalObjectId === cleanGlobalObjectId).map(o => o.objectId);
                ev.dataTransfer.setData("occurrencesObjectIds", JSON.stringify(occurrencesObjectId));
            }
        }
    }

}
