import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {}

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

}
