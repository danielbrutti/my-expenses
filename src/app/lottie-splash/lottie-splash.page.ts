import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-splash',
  templateUrl: './lottie-splash.page.html',
  styleUrls: ['./lottie-splash.page.scss'],
})
export class LottieSplashPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/lottie.json',
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  animationCompleted(): void {
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}
