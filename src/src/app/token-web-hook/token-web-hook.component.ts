import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token-web-hook',
  templateUrl: './token-web-hook.component.html',
  styleUrls: ['./token-web-hook.component.scss']
})
export class TokenWebHookComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // TODO: instead of doing this in a component, we could have it in app initializer, so it works on all pages !
    const token = this.route.queryParams.subscribe(o => {
      const token = o['token'];
      localStorage.setItem('teams-token', token);
      this.router.navigateByUrl('/dashboard');
    });
  }

}
