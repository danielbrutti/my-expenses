import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from './shared/services/log.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'finger-print' },
    { title: 'Dashboard', url: '/dashboard', icon: 'infinite' },
    { title: 'Accounts', url: '/accounts', icon: 'bookmarks' },
    { title: 'Analysis', url: '/analysis', icon: 'bar-chart' },
    { title: 'Currency', url: '/currency', icon: 'cash' },
    { title: 'Settings', url: '/settings', icon: 'cog' },
  ];

  constructor(
    private _router: Router
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    LogService.logInfo('App Initialized');
    //this._router.navigateByUrl('lottie-splash', { replaceUrl: true });
    this._router.navigateByUrl('login', { replaceUrl: true });
  }
}
