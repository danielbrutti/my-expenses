import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LottieSplashPageRoutingModule } from './lottie-splash-routing.module';

import { LottieSplashPage } from './lottie-splash.page';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SharedModule } from '../shared/shared.module';

// Note we need a separate function as it's required
// by the AOT compiler.
/* eslint-disable-next-line */
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LottieSplashPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [LottieSplashPage]
})
export class LottieSplashPageModule {}
