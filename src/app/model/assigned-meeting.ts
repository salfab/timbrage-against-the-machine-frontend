import { CalendarEvent } from './calendar-event';
import { Ticket } from "./ticket";



export class AssignedMeeting {
    /**
     *
     */
    constructor(public issue: Ticket, public meeting: CalendarEvent) {
    }

}
