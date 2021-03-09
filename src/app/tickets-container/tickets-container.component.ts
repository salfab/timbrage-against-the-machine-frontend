import { Component, OnInit } from '@angular/core';
import { TicketsApiService } from '../tickets-api.service';

@Component({
  selector: 'app-tickets-container',
  templateUrl: './tickets-container.component.html',
  styleUrls: ['./tickets-container.component.scss']
})
export class TicketsContainerComponent implements OnInit {

  constructor(private readonly ticketsApi: TicketsApiService) { }

  ngOnInit(): void {
    console.log(new Date().toISOString());
    this.ticketsApi.logTimeOnTicket('VAAPI-3422', "Timbrage against the machine.", new Date(), 120).subscribe(o => {
      console.log(o);
    });
  }

}
