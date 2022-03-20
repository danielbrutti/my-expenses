import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: string): Observable<void> {
    return from(
      Storage.set({key, value})
    );
  }

  get(key: string): Observable<string> {
    return from(
      Storage.get({ key })
    ).pipe(
      map((result: GetResult) => result.value)
    );
  }

  remove(key: string): Observable<void> {
    return from(
      Storage.remove({ key })
    );
  }
}
