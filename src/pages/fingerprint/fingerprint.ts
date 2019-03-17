import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the FingerprintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fingerprint',
  templateUrl: 'fingerprint.html',
})
export class FingerprintPage {

  message : string = "Preparing fingerprint sensor..";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faio: FingerprintAIO,
    private toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    this.faio.isAvailable()
      .then(
        () => {
          console.log('yes device have fingerprint !! ');
          this.faio.show({
              clientId: 'Fingerprint-Demo',
              clientSecret: 'password', //Only necessary for Android
              disableBackup: true, //Only for Android(optional)
              localizedFallbackTitle: 'Use Pin', //Only for iOS
              localizedReason: 'Please authenticate' //Only for iOS
            })
            .then((result: any) => {
              console.log(result);
              const toast = this.toastCtrl.create({
                message: 'Fingerprint recognized..',
                duration: 5000,
              });
              toast.present();
              this.message = "Fingerprint recognized.. You can continue use apps !";
            })
            .catch((error: any) => {
              console.log(error);
              // const toast = this.toastCtrl.create({
              //   message: 'Error authenticate fingerprint..',
              //   duration: 2500,
              // });
              // toast.present();
              // this.message = "Fingerprint Authentication failed..";
            });
        }
      )
      .catch(
        () => {
          const toast = this.toastCtrl.create({
            message: 'Sorry Device is didnt have fingerprint sensor',
            duration: 2500,
          });
          toast.present();
          this.message = "Missing Fingerprint Sensor..";
        }
      );
  }

}
