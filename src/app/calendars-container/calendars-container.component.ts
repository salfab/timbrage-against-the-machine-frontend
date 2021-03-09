import { Component, OnInit } from '@angular/core';
import { TeamsApiService } from '../teams-api.service';

@Component({
  selector: 'app-calendars-container',
  templateUrl: './calendars-container.component.html',
  styleUrls: ['./calendars-container.component.scss']
})
export class CalendarsContainerComponent implements OnInit {

  constructor(private readonly teamsApi: TeamsApiService) { }

  ngOnInit(): void {
  }

}
