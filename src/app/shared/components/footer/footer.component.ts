import { APP_INITIALIZER, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { App, AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  appVersion$: Observable<string>;
  private appVersion = new BehaviorSubject<string>('Browser');

  constructor(private platform: Platform) {
  }

  get currentYear(): number {
    LogService.logInfo('Current Year');
    return new Date().getFullYear();
  }

  ngOnInit() {
    LogService.logInfo('Footer Screen');
    this.appVersion$ = this.appVersion.asObservable();
    if (this.platform.is('capacitor')) {
      from(App.getInfo())
        .pipe(
          tap(appInfo => LogService.logInfo('App Info', appInfo)),
          map(appInfo => this.appVersion.next(appInfo.version))
        ).subscribe();
    }
  }

}
