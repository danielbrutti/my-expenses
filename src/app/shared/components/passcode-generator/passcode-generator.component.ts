import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasscodeComponent } from '../passcode/passcode.component';

@Component({
  selector: 'app-passcode-generator',
  templateUrl: './passcode-generator.component.html',
  styleUrls: ['./passcode-generator.component.scss'],
})
export class PasscodeGeneratorComponent implements OnInit {

  @ViewChild(PasscodeComponent) passcodeComponent: PasscodeComponent;

  firstCode: string;
  secondCode: string;

  constructor(private _modalController: ModalController) { }

  ngOnInit() { }

  async onPasscode(enteredPasscode) {
    if (!this.firstCode) {
      this.firstCode = enteredPasscode;
      this.passcodeComponent.success();
      return;
    }

    if (this.firstCode === enteredPasscode) {
      this.passcodeComponent.success();
      await this._modalController.dismiss(enteredPasscode);
    } else {
      this.passcodeComponent.fail();
      this.firstCode = null;
    }
  }
}
