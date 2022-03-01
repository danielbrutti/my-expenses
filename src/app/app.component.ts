import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'infinite' },
    { title: 'Accounts', url: '/accounts', icon: 'bookmarks' },
    { title: 'Analysis', url: '/analysis', icon: 'bar-chart' },
    { title: 'Currency', url: '/currency', icon: 'cash' },
    { title: 'Settings', url: '/settings', icon: 'cog' },
  ];

  constructor(
    private router: Router
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    this.router.navigateByUrl('lottie-splash', { replaceUrl: true });
  }
}
