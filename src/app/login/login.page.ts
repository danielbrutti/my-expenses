import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PasscodeGeneratorComponent } from '../shared/components/passcode-generator/passcode-generator.component';
import { PasscodeVerificationStatus } from '../shared/components/passcode-verifier/passcode-verifier.component';
import { LogService } from '../shared/services/log.service';
import { StorageService } from '../shared/services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {

  passcode: string;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _modalController: ModalController) {
  }

  ngOnInit() {
    LogService.logInfo('Login Screen');
    this._checkGeneratePasscode();
  }

  onVerificationComplete(status) {
    if (PasscodeVerificationStatus.success === status) {
      this._success();
    } else {
      this._fail();
    }
  }

  private _checkGeneratePasscode() {
    this._storageService.get('passcode').subscribe(async (passcode) => {
      if (!passcode) {
        await this._generatePasscode();
        return;
      }
      this.passcode = passcode;
    });
  }

  private async _generatePasscode() {
    const modal = await this._modalController.create({
      component: PasscodeGeneratorComponent
    });
    modal.onDidDismiss().then((response) => {
      const code = response.data;
      this._storageService.set('passcode', code);
      this.passcode = code;
    });
    await modal.present();
  }

  private _success(): void {
    this._router.navigateByUrl('dashboard', { replaceUrl: true });
  }

  private _fail(): void {
    this._router.navigateByUrl('lottie-splash', { replaceUrl: true });
  }

}
