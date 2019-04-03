import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: 'app.html'
})
export class AwesomePlaces {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    fcm: FcmProvider,
    toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      if(platform.is('android')){
        console.log('jalan ga !! ');
        // Get a FCM token
        fcm.getToken();

        fcm.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = toastCtrl.create({
              message: msg.body,
              duration: 3000
            });
            toast.present();
          })
        )
        .subscribe();
      }

      this.rootPage = HomePage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

