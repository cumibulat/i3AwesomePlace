import {
  Injectable
} from '@angular/core';
import {
  Platform
} from 'ionic-angular';
import {
  Storage
} from '@ionic/storage';
import {
  BehaviorSubject
} from 'rxjs';
import firebase from 'firebase';

const TOKEN_KEY = 'auth-token';
// const USER = 'xx'


@Injectable()
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      firebase.auth().signOut();
      this.authenticationState.next(false);
    });
  }

  setAuthenticated() {
    this.authenticationState.next(true);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
