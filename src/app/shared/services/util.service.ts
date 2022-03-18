import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  static isNullOrUndefined(data: any): boolean {
    return data === null || data === undefined;
  }

  static isNullOrEmpty(data: any): boolean {
    if (this.isNullOrUndefined(data)) {
      return true;
    }
    if (data instanceof Array) {
      return !(data ? data.length > 0 : false);
    } else {
      return !data;
    }
  }

  static unsubscribe(object: Subscription | Subject<any>): void {
    if (!object) {
      return;
    }
    if (object instanceof Subject) {
      object.next();
      object.complete();
    } else {
      object.unsubscribe();
    }
  }
}
