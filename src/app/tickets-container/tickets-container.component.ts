import { Ticket } from './../model/ticket';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeetingAssigned } from '../model/meeting-assigned';

@Component({
    selector: 'app-tickets-container',
    templateUrl: './tickets-container.component.html',
    styleUrls: ['./tickets-container.component.scss']
})
export class TicketsContainerComponent implements OnInit {

    @Output() 
    public assigned: EventEmitter<MeetingAssigned> = new EventEmitter();
    
    public tickets: Array<Ticket> = [];

    constructor() { }

    ngOnInit(): void {
        this.tickets = [{ issueKey: 'PRJXC02-123' } as Ticket, { issueKey: 'PRJXC02-456' } as Ticket, { issueKey: 'PRJXC02-789' } as Ticket]
    }

    public drop(event: DragEvent) : void {
        event.preventDefault();
        const objectId = event.dataTransfer?.getData("objectId");

        const targetDiv = event.target as HTMLDivElement;
        const issueKey = targetDiv.dataset["issueKey"];

        if (objectId && issueKey) {
            this.assigned.emit(new MeetingAssigned(issueKey, objectId))
        }
    }

    public allowDrop(event: DragEvent) : void {
        event.preventDefault();
    }

}
