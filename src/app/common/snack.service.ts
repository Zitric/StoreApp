import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class SnackService {

  private snachBarOptions: MatSnackBarConfig = new MatSnackBarConfig();

  constructor( private snachBar: MatSnackBar ) { }

  launch( message: string, action: string, duration: number ) {
    this.snachBarOptions.duration = duration;
    this.snachBar.open( message, action, this.snachBarOptions );
  }

}
