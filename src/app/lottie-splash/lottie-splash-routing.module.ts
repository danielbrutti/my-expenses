import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LottieSplashPage } from './lottie-splash.page';

const routes: Routes = [
  {
    path: '',
    component: LottieSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LottieSplashPageRoutingModule {}
