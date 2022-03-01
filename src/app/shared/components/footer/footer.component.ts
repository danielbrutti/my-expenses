import { Component, OnInit } from '@angular/core';
import { App, AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private platform: Platform) { }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  get appVersion(): Observable<string> {
    if (this.platform.is('capacitor')) {
      return from(App.getInfo())
        .pipe(
          tap((appInfo) => console.log(appInfo)),
          map((appInfo) => appInfo.version)
        );
    }

    return of('Browser');
  }

  ngOnInit() { }

}
