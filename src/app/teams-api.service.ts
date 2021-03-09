import { Injectable } from '@angular/core';
import { CalendarEventsResponse } from './model/calendar-events-response';

@Injectable({
  providedIn: 'root'
})
export class TeamsApiService {

  constructor(accessToken: string) { }

  public getCalendarEvents(): CalendarEventsResponse {
    throw new Error('not implemented');

  }
}
