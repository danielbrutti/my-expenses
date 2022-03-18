import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { LogService } from '../shared/services/log.service';

@Component({
  selector: 'app-lottie-splash',
  templateUrl: './lottie-splash.page.html',
  styleUrls: ['./lottie-splash.page.scss'],
})
export class LottieSplashPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/lottie.json',
  };

  constructor(private _router: Router) { }

  ngOnInit() {
    LogService.logInfo('Lottie Splash Screen');
  }

  animationCompleted(): void {
    LogService.logInfo('Lottie Splash Completed');
    this._router.navigateByUrl('login', { replaceUrl: true });
  }

}
