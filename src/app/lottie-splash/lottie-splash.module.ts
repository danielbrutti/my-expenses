import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LottieSplashPageRoutingModule } from './lottie-splash-routing.module';

import { LottieSplashPage } from './lottie-splash.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LottieSplashPageRoutingModule,
  ],
  declarations: [LottieSplashPage]
})
export class LottieSplashPageModule {}
