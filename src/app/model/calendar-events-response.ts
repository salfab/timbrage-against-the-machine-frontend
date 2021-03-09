import { CalendarEvent } from "./calendar-event";


export interface CalendarEventsResponse {
    type: string;
    value: CalendarEvent[];
}
