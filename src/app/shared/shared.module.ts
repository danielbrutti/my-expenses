import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { BiometricService } from './services/biometric.service';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { IonicModule } from '@ionic/angular';
import { LogService } from './services/log.service';
import { UtilService } from './services/util.service';
import { PasscodeVerifierComponent } from './components/passcode-verifier/passcode-verifier.component';
import { PasscodeGeneratorComponent } from './components/passcode-generator/passcode-generator.component';
import { PasscodeComponent } from './components/passcode/passcode.component';
import { StorageService } from './services/storage-service.service';

// Note we need a separate function as it's required
// by the AOT compiler.
/* eslint-disable-next-line */
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    FooterComponent,
    PasscodeComponent,
    PasscodeVerifierComponent,
    PasscodeGeneratorComponent
  ],
  providers: [
    LogService,
    UtilService,
    BiometricService,
    StorageService
  ],
  imports: [
      CommonModule,
      IonicModule,
      LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
      FooterComponent,
      PasscodeVerifierComponent,
      PasscodeGeneratorComponent,
      LottieModule
  ]
})
export class SharedModule { }
