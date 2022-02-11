import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssignedMeeting } from '../model/assigned-meeting';
import { CalendarEvent } from '../model/calendar-event';
import { Ticket } from '../model/ticket';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnChanges {

    @Input()
    public totalWorktime!: number;

    @Input()
    public unassignedTime!: number;

    @Input()
    public assignedMeetings: Array<AssignedMeeting> = [];

    public hoursPerTicket: { [key: string]: number }  = {};
    public percentageTimePerTicket: { [key: string]: number }  = {};

    constructor() { }

    ngOnInit(): void {
        this.refreshStats();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['assignedMeetings']) {
            this.refreshStats();
        }
    }

    private refreshStats() {
        const issues = this.assignedMeetings.map(o => o.issue);
        var uniqueTickets: Array<Ticket> = [];
        issues.forEach(element => {
            if (!element.ignoreInTimeCalculation && !uniqueTickets.includes(element)) {
                uniqueTickets.push(element)
            }
        });


        uniqueTickets.forEach(a => {
            const ticketTime = this.getTotalTimeForTicket(a.issueKey);
            this.hoursPerTicket[a.issueKey] = ticketTime;
            this.percentageTimePerTicket[a.issueKey] = ticketTime / this.totalWorktime * 100;
        });

        this.percentageTimePerTicket["hors-meeting"] = this.unassignedTime / this.totalWorktime * 100;




        for (const key in this.hoursPerTicket) {
            if (Object.prototype.hasOwnProperty.call(this.hoursPerTicket, key)) {
                
            }
        }
        
    }


    public getTotalTimeForTicket(ticket: string): number {
        let total = 0;
        // todo use meaningful param naming in lambda
        const meetings = this.assignedMeetings.filter(o => o.issue.issueKey === ticket);
        for (let index = 0; index < meetings.length; index++) {
            const meeting = meetings[index];
            const minutes = this.getDurationInMinutes(meeting.meeting);
            total = total + minutes;
        }
        return total;
    }

    // todo:this method is duplicated : refactor code to have it only in 1 place. (in the meeting class ?)
    public getDurationInMinutes(event: CalendarEvent) {
        const endTime = new Date(event.endTime);
        const startTime = new Date(event.startTime);
        const duration = (endTime.valueOf() - startTime.valueOf()) / 60000;

        return duration;
    }
}
