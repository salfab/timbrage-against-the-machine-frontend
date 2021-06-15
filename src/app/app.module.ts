import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { CalendarsContainerComponent } from './calendars-container/calendars-container.component';
import { TicketsContainerComponent } from './tickets-container/tickets-container.component';
import { HttpClientModule } from '@angular/common/http';

import { CalendarEventsComponent } from './calendar-events/calendar-events.component';
import { TokenWebHookComponent } from './token-web-hook/token-web-hook.component';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    DashboardContainerComponent,
    CalendarsContainerComponent,
    TicketsContainerComponent,
    CalendarEventsComponent,
    TokenWebHookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
