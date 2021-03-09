
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

    public teamsAccessToken: string = "";
    constructor() { }

    ngOnInit(): void {
    }

    tokenChanged(evt: Event) : void {
        this.teamsAccessToken = (evt.target as HTMLInputElement).value;
    }
}
