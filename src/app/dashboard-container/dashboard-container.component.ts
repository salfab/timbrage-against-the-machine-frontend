import { MeetingAssigned as MeetingAssignedEvent } from './../model/meeting-assigned';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

    public teamsAccessToken: string = "";
    constructor() { }

    ngOnInit(): void {
    }

    tokenChanged(evt: Event) : void {
        this.teamsAccessToken = (evt.target as HTMLInputElement).value;
    }

    public onAssigned(evt: MeetingAssignedEvent) : void {
        console.log(`${evt.meetingObjectId} will be logged on ticket ${evt.issueKey}`)
    }
}
