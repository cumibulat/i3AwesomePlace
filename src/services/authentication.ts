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
    console.log('cek dl ya :: ', email);
    console.log('cek dl ya :: password', password);

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.authenticationState.next(true);
      });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
