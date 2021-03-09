import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Basic ZW1wOlZhdWRvaXNlMTI='})
  };

  public logTimeOnTicket(ticketId: string, comment: string, logdate : Date, duration : number) {
    const formattedDate = logdate.toISOString().slice(0, -1) + "+0000";
    const body = { comment: comment,
                  started: formattedDate,
                  timeSpentSeconds: duration
  }
  return this.http.post<any>("/rest/api/latest/issue/" + ticketId + "/worklog", body, this.httpOptions);
}

}
