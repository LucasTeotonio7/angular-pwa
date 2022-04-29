import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private statusConnection$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.updateStatusConnection());
    window.addEventListener('offline', () => this.updateStatusConnection());
  }

  get isOnline(): boolean{
    return !!window.navigator.onLine;
  }

  get statusConnection(): Observable<boolean> {
    return this.statusConnection$.asObservable();
  }

  updateStatusConnection(){
    this.statusConnection$.next(this.isOnline)
  }

}
