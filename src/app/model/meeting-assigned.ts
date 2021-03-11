import { Ticket } from "./ticket";

export class MeetingAssignedEvent {
    /**
     *
     */
    constructor(public issue: Ticket, public meetingObjectId: string) {
        
    }

}


