import { Ticket } from './../model/ticket';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tickets-container',
    templateUrl: './tickets-container.component.html',
    styleUrls: ['./tickets-container.component.scss']
})
export class TicketsContainerComponent implements OnInit {

    public tickets: Array<Ticket> = [];

    constructor() { }

    ngOnInit(): void {
        this.tickets = [{ issueKey: 'PRJXC02-123' } as Ticket, { issueKey: 'PRJXC02-456' } as Ticket, { issueKey: 'PRJXC02-789' } as Ticket]
    }

}
