import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PasscodeComponent } from '../passcode/passcode.component';

export enum PasscodeVerificationStatus {
  success = 'success',
  fail = 'fail'
}

@Component({
  selector: 'app-passcode-verifier',
  templateUrl: './passcode-verifier.component.html',
  styleUrls: ['./passcode-verifier.component.scss'],
})
export class PasscodeVerifierComponent implements OnInit {

  @ViewChild(PasscodeComponent) passcodeComponent: PasscodeComponent;

  @Output()
  verificationComplete = new EventEmitter<PasscodeVerificationStatus>();

  @Input()
  passcode = '';

  @Input()
  maxAttemps = 3;

  private _passcodeAttempts = 0;

  constructor() { }

  ngOnInit() {}

  onPasscode(enteredPasscode) {
    if (enteredPasscode.length >= 4) {
      if (enteredPasscode === '' + this.passcode) {
        this._success();
      } else {
        this._fail();
      }
    }
  }

  onFingerprint(status) {
    if (PasscodeVerificationStatus.success === status) {
      this._success();
    } else {
      this._fail();
    }
  }

  private _success(): void {
    this._passcodeAttempts = 0;
    this.passcodeComponent.success();
    this.verificationComplete.emit(PasscodeVerificationStatus.success);
  }

  private _fail(): void {
    this._passcodeAttempts++;
    this.passcodeComponent.fail();
    if(this._passcodeAttempts >= this.maxAttemps) {
      this._passcodeAttempts = 0;
      this.verificationComplete.emit(PasscodeVerificationStatus.fail);
    }
  }

}
