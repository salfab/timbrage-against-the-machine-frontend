import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenWebHookComponent } from './token-web-hook/token-web-hook.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardContainerComponent },
  { path: 'token', component:  TokenWebHookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
