import { AuthenticationService } from './../services/authentication';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginPage } from '../pages/login/login';


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
    toastCtrl: ToastController,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    platform.ready().then(() => {
      if(platform.is('android')){
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

      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // temporary comment so dont have to do login.
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          // this.router.navigate(['members', 'dashboard']);
          this.rootPage = HomePage;
        } else {
          // this.router.navigate(['login']);
          this.rootPage = LoginPage;
        }
      });

      //by pass login screen
      // this.authenticationService.setAuthenticated();
      // this.rootPage = HomePage;
      //end of by pass login screen
    });
  }
}

