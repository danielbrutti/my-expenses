import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { BiometricService } from '../shared/services/biometric.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  animationOptions$: BehaviorSubject<AnimationOptions>;

  private _optionsPending: AnimationOptions = {
    path: '/assets/lottie-fingerprint-pending.json'
  };

  private _optionsSuccess: AnimationOptions = {
    path: '/assets/lottie-fingerprint-success.json',
    loop: 0
  };

  private _optionsFail: AnimationOptions = {
    path: '/assets/lottie-fingerprint-fail.json',
    loop: 0
  };

  constructor(
    private _biometricService: BiometricService
  ) {
    this.animationOptions$ = new BehaviorSubject<AnimationOptions>(this._optionsPending);
  }

  ngOnInit() {
    this._verifyIdentity();
  }

  private _verifyIdentity(): void {
    setTimeout(() => {
      this._biometricService.verifyIdentity()
        .subscribe(
          (verified) => {
            if (verified) {
              this.animationOptions$.next(this._optionsSuccess);
            } else {
              this.animationOptions$.next(this._optionsFail);
            }
          },
          () => {
            this.animationOptions$.next(this._optionsFail);
          });
    }, 1100);
  }

}
