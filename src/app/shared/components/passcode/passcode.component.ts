import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BiometricService } from '../../services/biometric.service';
import { LogService } from '../../services/log.service';
import { PasscodeVerificationStatus } from '../passcode-verifier/passcode-verifier.component';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit {

  @Output()
  passcode = new EventEmitter<string>();

  @Output()
  fingerprint = new EventEmitter<PasscodeVerificationStatus>();

  @Input()
  fingerprintEnabled = false;

  enteredPasscode = '';
  isPasscodeWrong: boolean;

  constructor(private _biometricService: BiometricService) { }

  ngOnInit() {}

  remove(): void {
    if (this.enteredPasscode.length > 0) {
      this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    }
  }

  digit(digit: any): void {
    if (this.isPasscodeWrong) {
      return;
    }
    this.enteredPasscode += '' + digit;

    if (this.enteredPasscode.length >= 4) {
      this.passcode.emit(this.enteredPasscode);
    }
  }

  verifyFingerprint(): void {
    setTimeout(() => {
      this._biometricService.verifyIdentity()
        .then(
          (verified) => {
            LogService.logInfo('[Login] Identity Verified', verified);
            this.fingerprint.emit(PasscodeVerificationStatus.success);
          }
        )
        .catch((error) => {
          LogService.logError('[Login] Error Verifying Identity', error);
          this.fingerprint.emit(PasscodeVerificationStatus.fail);
        });
    }, 2200);
  }

  success() {
    this.enteredPasscode = '';
    this.isPasscodeWrong = false;
  }

  fail() {
    this.enteredPasscode = '';
    this.isPasscodeWrong = true;
    setTimeout(() => {
      this.isPasscodeWrong = false;
    }, 800);
  }

}
