import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppLoadingService {

  loading: Observable<boolean> = Observable.of(false);

  constructor( ) { }

  fileLoader() {
    this.loading = Observable.of(true);
  }

  stopLoader() {
    this.loading = Observable.of(false);
  }

}
