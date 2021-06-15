import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { from, Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private unsubscribe = new Subject<void>();
  private readonly tokenReceivedEventName = 'token_received';

  constructor(
    private oauthService: OAuthService) {}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public setupAuth(): void {
    //const silentRefreshRedirectUri = `${location.origin}/app/auth.silent-refresh.html`;
    const errorRefreshToken = 'silent_refresh_error';
    const absolutePath = 'http://localhost:4200/token';
    const authScope = 'ACT_AS_USER';
    const authResponseType = 'code';
    const tokenRefreshErrorMaxTry = 1;
    let tokenRefreshErrorCount = 0;

    const authCodeFlowConfig: AuthConfig = {
      redirectUri: absolutePath,
      useSilentRefresh: false,
      //silentRefreshRedirectUri: silentRefreshRedirectUri,
      issuer: 'https://di.vaudoise.ch/plugins/servlet/oauth/authorize',
      clientId: 'OauthKey',
      skipIssuerCheck: true,
      strictDiscoveryDocumentValidation: false,
      responseType: authResponseType,
      scope: authScope,
      timeoutFactor: 0.75,
    };
    this.oauthService.initCodeFlow();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }


  public hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private login(location: URL, absolutePath: string): Promise<void> {
    const storageRedirectUrlKey = 'redirectUrl';
    const silentRefreshListener = 'access_token';

    return this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      /*
          When loadDiscoveryDocumentAndLogin is called
          If the user wasn't logged in, the getIdentityClaim will return null,
           we then store the query string from the request and the page will refresh
          If the user was logged in, the getIdentyClaim will return the user information
           check if there was a url with parameters to redirect to and redirect
      */
      if (this.oauthService.getIdentityClaims() === null && location.href !== absolutePath) {
        localStorage.setItem(storageRedirectUrlKey, location.href);
      } else {
        const redirectUri = localStorage.getItem(storageRedirectUrlKey);

        if (redirectUri) {
          localStorage.removeItem(storageRedirectUrlKey);
          window.location.href = redirectUri;
        }
      }

      this.oauthService.setupAutomaticSilentRefresh([], silentRefreshListener, false);
    });
  }
}
