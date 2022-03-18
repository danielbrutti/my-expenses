import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { BiometricService } from '../shared/services/biometric.service';
import { LogService } from '../shared/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  animationOptions$: BehaviorSubject<AnimationOptions>;

  showLockScreen: boolean;
  passcodeWrong: boolean;
  touchId: boolean;

  passcodeAttempts = 0;

  enteredPasscode = '';
  passcode: string;

  selected: any;

  constructor(
    private _router: Router,
    private _biometricService: BiometricService
  ) {
    this.showLockScreen = true;
    this.touchId = false;
    this.passcode = '1234';
  }

  ngOnInit() {
    LogService.logInfo('Login Screen');
  }

  remove(): void {
    if (this.enteredPasscode.length > 0) {
      this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    }
  }

  digit(digit: any): void {
    this.selected = +digit;
    if (this.passcodeWrong) {
      return;
    }
    this.enteredPasscode += '' + digit;

    if (this.enteredPasscode.length >= 4) {
      if (this.enteredPasscode === '' + this.passcode) {
        this._success();
      } else {
        this._fail();
      }
    }
  }

  verifyFingerprint(): void {
    setTimeout(() => {
      this._biometricService.verifyIdentity()
        .then(
          (verified) => {
            LogService.logInfo('[Login] Identity Verified', verified);
            this._success();
          }
        )
        .catch((error) => {
          LogService.logError('[Login] Error Verifying Identity', error);
          this._fail();
        });
    }, 2200);
  }

  private _success(): void {
    this.enteredPasscode = '';
    this.passcodeAttempts = 0;
    this.showLockScreen = false;
    this._router.navigateByUrl('dashboard', { replaceUrl: true });
  }

  private _fail(): void {
    this.enteredPasscode = '';
    this.passcodeWrong = true;
    this.passcodeAttempts++;
    setTimeout(() => {
      this.passcodeWrong = false;
    }, 800);
  }

}
