import {
  Injectable
} from '@angular/core';
import {
  Firebase
} from '@ionic-native/firebase';
import {
  Platform
} from 'ionic-angular';
import {
  AngularFirestore
} from 'angularfire2/firestore';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {
    console.log('Hello FcmProvider Provider');
  }

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');
    const docData = {
      token,
      userId: 'testUser',
    };
    return devicesRef.doc(token).set(docData);
  }

  saveMessageToFirestore(msg){
    const listMessages = this.afs.collection('listMessages');

    const tmpMsg = msg;
    const tmpNow = new Date();
    tmpMsg.sendDate = tmpNow;

    return listMessages.add(tmpMsg);
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  fetchListMessage(){
    return this.afs.collection('listMessages', ref => ref.orderBy("sendDate","desc"));
  }

  saveDataToFirestore(collectionName, objData){
    const listMessages = this.afs.collection(collectionName);
    const tmpNow = new Date();
    objData.createdDate = tmpNow;
    return listMessages.add(objData);
  }

  getDataFromFirestore(collectionName){
    return this.afs.collection(collectionName);
  }

}
