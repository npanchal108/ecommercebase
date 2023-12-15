import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private subject = new Subject<any>();

  constructor() { }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  LoadingMessage(message: string) {
    this.subject.next({ text: message });
  }

}
