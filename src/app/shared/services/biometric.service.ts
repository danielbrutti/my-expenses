import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeBiometric, AvailableResult, BiometryType } from 'capacitor-native-biometric';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  constructor(
    private _platform: Platform
  ) { }

  isAvailable(): Observable<boolean> {
    if (!this._platform.is('capacitor')) {
      return of(false);
    }
    return from(NativeBiometric.isAvailable())
      .pipe(
        map((result: AvailableResult) => result.isAvailable),
        catchError(() => of(false))
      );
  }

  verifyIdentity(): Observable<boolean> {
    if (!this._platform.is('capacitor')) {
      return of(false);
    }
    return from(this.isAvailable())
      .pipe(
        map((available) => {
          if (!available) {
            throwError('Biometric not available');
          }
          return from(
            NativeBiometric.verifyIdentity({
              reason: 'For easy log in',
              title: 'Log in',
              subtitle: 'Maybe add subtitle here?',
              description: 'Maybe a description too?',
            })
          );
        }),

        // Authentication successful
        map(() => true),

        // Authentication error or not available
        catchError((error) => {
          console.log('[Biometric Error], error');
          return of(false);
        })
      );
  }
}
