import { AssignedMeeting } from './../model/assigned-meeting';
import { Ticket } from './../model/ticket';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeetingAssignedEvent } from '../model/meeting-assigned';
import { CalendarEvent } from '../model/calendar-event';
import { ChangeAssignedMeetingsEvent } from '../model/change-assigned-meetings';

@Component({
    selector: 'app-tickets-container',
    templateUrl: './tickets-container.component.html',
    styleUrls: ['./tickets-container.component.scss']
})
export class TicketsContainerComponent implements OnInit {
    @Output()
    public assignedMeetingsUpdated: EventEmitter<ChangeAssignedMeetingsEvent> = new EventEmitter();

    @Output()
    public assigned: EventEmitter<MeetingAssignedEvent> = new EventEmitter();

    @Input()
    public assignedMeetings: Array<AssignedMeeting> = []

    public tickets: Array<Ticket> = [];
    public isDetailsPanelShown: boolean = false;
    public selectedTicketDetails: string = "";
    

    constructor() { }

    ngOnInit(): void {
        const loadedTickets = window.localStorage.getItem('timbrage-against-the-machine-tickets');
        if (loadedTickets) {
            const persistedState = JSON.parse(loadedTickets); 
            for (let index = 0; index < persistedState.length; index++) {
                const persistedTicket = persistedState[index];
                this.tickets.push(new Ticket(persistedTicket.issueKey, persistedTicket?.ignoreInTimeCalculation));
            }
        } else {
            this.tickets = [new Ticket('ignore this meeting', true)]
        }
    }

    public onDiscard(event: Event, ticket: Ticket): void {
        const index = this.tickets.indexOf(ticket);
        this.tickets.splice(index,1);
        this.saveTicketsInLocalStorage(this.tickets);
    }

    public drop(event: DragEvent): void {
        event.preventDefault();
        const objectId = event.dataTransfer?.getData("objectId");
        const occurrencesObjectIdsAsString = event.dataTransfer?.getData("occurrencesObjectIds");

        const targetDiv = event.target as HTMLDivElement;
        const issueKey = targetDiv.dataset["issueKey"];
        const issue = this.tickets.find(o => o.issueKey === issueKey);

        if (objectId && issue) {
            if (occurrencesObjectIdsAsString) {
                const occurrencesObjectIds: Array<string> = JSON.parse(occurrencesObjectIdsAsString);
                for (let index = 0; index < occurrencesObjectIds.length; index++) {
                    const occurenceObjectId = occurrencesObjectIds[index];
                    this.assigned.emit(new MeetingAssignedEvent(issue, occurenceObjectId))
                }
            } else {
                this.assigned.emit(new MeetingAssignedEvent(issue, objectId))
            }
        }
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
    }

    public onJiraKeystroke(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            const input = (event.target as HTMLInputElement);
            this.tickets.push(new Ticket(input.value));
            input.value = '';
            this.saveTicketsInLocalStorage(this.tickets);
        }
    }
    private saveTicketsInLocalStorage(tickets: Ticket[]) {
        window.localStorage.setItem('timbrage-against-the-machine-tickets', JSON.stringify(this.tickets));
    }
    
    public getTotalTimeForTicket(ticket: string): number {
        let total = 0;
        // todo use meaningful param naming in lambda
        const meetings = this.getMeetingsByTicket(ticket);
        for (let index = 0; index < meetings.length; index++) {
            const meeting = meetings[index];
            const minutes = this.getDurationInMinutes(meeting.meeting);
            total = total + minutes;
        }
        return total;
    }

    public getMeetingsByTicket(ticket: string): AssignedMeeting[] {
        return this.assignedMeetings.filter(o => o.issue.issueKey === ticket);
    }

    // todo:this method is duplicated : refactor code to have it only in 1 place. (in the meeting class ?)
    public getDurationInMinutes(event: CalendarEvent): number {
        const endTime = new Date(event.endTime);
        const startTime = new Date(event.startTime);
        const duration = (endTime.valueOf() - startTime.valueOf()) / 60000;

        return duration;
    }

    public openDetails(ticket: string): void {
        this.isDetailsPanelShown = true;
        this.selectedTicketDetails = ticket;
    }

    public closeDetails(): void {
        this.isDetailsPanelShown = false;
    }

    public unassignMeeting(assignedMeeting: AssignedMeeting): void {
        const deassignedMeetings = this.assignedMeetings.splice(this.assignedMeetings.indexOf(assignedMeeting), 1);
        this.assignedMeetingsUpdated.emit(new ChangeAssignedMeetingsEvent(this.assignedMeetings, deassignedMeetings));
        debugger
    }
    
}
