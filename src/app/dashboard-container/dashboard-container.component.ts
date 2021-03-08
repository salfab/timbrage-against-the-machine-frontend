
import { Component, OnInit } from '@angular/core';
import { TeamsAuthenticationService } from '../teams-authentication.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  constructor(private readonly teamsAuth: TeamsAuthenticationService) { }

  ngOnInit(): void {
  }

}
