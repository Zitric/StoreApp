import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user = this.afAuth.authState.switchMap ( user => {
      if ( user ) {
        return this.afs.doc<User>('users/' + user.uid ).valueChanges();
      } else {
        return Observable.of( null );
      }
    });
  }

  private oAuthLogin( provider ) {
    return this.afAuth.auth.signInWithPopup( provider )
      .then( credentials => {
        this.router.navigate(['/store']);
      });
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin( provider );
  }

  public facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin( provider );
  }

  public twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin( provider );
  }

  public emailAndPassword( email, password ) {
    return this.afAuth.auth.signInWithEmailAndPassword( email.value, password.value );
  }

  public signUp( email, password ) {
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password );
  }

  public signOut() {
    this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    });
  }
}
