import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  static logInfo(message: string, data?: any): void {
    console.log(`[MyExpenses] [INFO] ${message}`, data instanceof Object ? JSON.stringify(data) : data ?? '');
  }

  static logError(message: string, data?: any): void {
    console.error(`[MyExpenses] [ERROR] ${message}`, data instanceof Object ? JSON.stringify(data) : data ?? '');
  }

  static logWarning(message: string, data?: any): void {
    console.warn(`[MyExpenses] [WARN] ${message}`, data instanceof Object ? JSON.stringify(data) : data ?? '');
  }
}
