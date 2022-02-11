import { CalendarEvent } from './calendar-event';

export class MeetingsUpdated {
    /**
     *
     */
    constructor(public meetings: Array<CalendarEvent>) {
    }

}
