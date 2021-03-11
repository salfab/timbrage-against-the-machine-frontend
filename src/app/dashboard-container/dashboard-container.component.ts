import { MeetingAssignedEvent } from './../model/meeting-assigned';

import { Component, OnInit } from '@angular/core';
import { AssignedMeeting } from '../model/assigned-meeting';
import { CalendarEvent } from '../model/calendar-event';
import { MeetingsUpdated } from '../model/meetings-updated';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

    public totalMinutesWorked: number = 0;
    public teamsAccessToken: string = "";
    public assignedMeetings: Array<AssignedMeeting> = [];
    public meetings: Array<CalendarEvent> = [];
    constructor() { }

    ngOnInit(): void {
    }

    tokenChanged(evt: Event) : void {
        this.teamsAccessToken = (evt.target as HTMLInputElement).value;
    }

    public getUnassignedTime(): number {
        let timeToDeduct = 0;
        const assignationsToConsider = this.assignedMeetings.filter(o => !o.issue.ignoreInTimeCalculation);
        for (let index = 0; index < assignationsToConsider.length; index++) {
            const assignation = this.assignedMeetings.filter(o => !o.issue.ignoreInTimeCalculation)[index];
            timeToDeduct += this.getDurationInMinutes(assignation.meeting);
        }
        return this.totalMinutesWorked - timeToDeduct;
    }

    public totalHoursChanged(evt: Event) : void {
        const hoursInput = (evt.target as HTMLInputElement).value;
        const separatorPosition = hoursInput.indexOf(':');
        const hoursAsString = hoursInput.slice(0, separatorPosition-1);
        const minutesAsString = hoursInput.slice(separatorPosition+1);
        this.totalMinutesWorked = Number.parseInt(hoursAsString) * 60 + Number.parseInt(minutesAsString);
    }
    
    public onAssigned(evt: MeetingAssignedEvent) : void {

        const meeting = this.meetings.find(m => m.objectId == evt.meetingObjectId);

        if (meeting == null) {
            throw new Error(`meeting not found: ${evt.meetingObjectId}`)
        }

        console.log(`${meeting?.subject} will be logged on ticket ${evt.issue}`);
        console.log(`${meeting.subject} will be logged on ticket ${evt.issue}`);
        this.assignedMeetings.push(new AssignedMeeting(evt.issue, meeting));
        this.assignedMeetings = [...this.assignedMeetings];
    } 
    
    public onMeetingsUpdated(evt: MeetingsUpdated) : void {
        debugger
        this.meetings = evt.meetings;
    }

    // todo : refactor this method because it is duplicated in at least 2 other places.
    public getDurationInMinutes(event: CalendarEvent) {
        const endTime = new Date(event.endTime);
        const startTime = new Date(event.startTime);
        const duration = (endTime.valueOf() - startTime.valueOf()) / 60000;

        return duration;
    }
}
