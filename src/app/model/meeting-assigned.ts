import { CalendarEvent } from './calendar-event';
import { Ticket } from "./ticket";

export class MeetingAssigned {
    /**
     *
     */
    constructor(public issueKey: string, public meetingObjectId: string) {
        
    }

}