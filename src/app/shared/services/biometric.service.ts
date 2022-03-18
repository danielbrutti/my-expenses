import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeBiometric, AvailableResult } from 'capacitor-native-biometric';
import { from, Observable, of, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  constructor(
    private _platform: Platform
  ) { }

  isAvailable(): Promise<boolean> {
    if (!this._platform.is('capacitor')) {
      LogService.logInfo('[Biometric] Not Capacitor');
      return Promise.reject();
    }
    return new Promise(
      (resolve, reject) => {
        NativeBiometric.isAvailable()
          .then((available) => {
            LogService.logInfo('[Biometric] Available? ', available);
            resolve(available.isAvailable);
          })
          .catch((error) => {
            LogService.logError('[Biometric][Error] Availability', error);
            return reject();
          });
      });
  }

  verifyIdentity(): Promise<boolean> {
    if (!this._platform.is('capacitor')) {
      LogService.logInfo('[Biometric] Not Capacitor');
      return Promise.reject();
    }
    return new Promise(
      (resolve, reject) => {
        NativeBiometric.verifyIdentity({
          reason: 'To Log in and protect your personal information',
          title: 'Verify your identity',
          subtitle: 'Touch the fingerprint sensor',
          description: '',
        })
          .then(() => {
            LogService.logInfo('[Biometric] Verified');
            resolve(true);
          })
          .catch((error) => {
            LogService.logError('[Biometric][Error] Not Verified', error);
            return reject();
          });
      });
  }
}
