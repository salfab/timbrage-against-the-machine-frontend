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

    public teamsAccessToken: string = "";
    public assignedMeetings: Array<AssignedMeeting> = [];
    public meetings: Array<CalendarEvent> = [];
    constructor() { }

    ngOnInit(): void {
    }

    tokenChanged(evt: Event) : void {
        this.teamsAccessToken = (evt.target as HTMLInputElement).value;
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
}
