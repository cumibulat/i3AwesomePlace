import { AuthenticationService } from './../services/authentication';
import { AppRoutingModule } from './app-routing.module';
import { FingerprintPage } from './../pages/fingerprint/fingerprint';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AwesomePlaces } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from '../pages/add-place/add-place';
import { PlacePage } from '../pages/place/place';
import { SetLocationPage } from '../pages/set-location/set-location';
import { AgmCoreModule } from '@agm/core';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { PlacesService } from '../services/places';
import { IonicStorageModule  } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeMapsPage } from '../pages/native-maps/native-maps';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmProvider } from '../providers/fcm/fcm';
import { SendmessagePage } from '../pages/sendmessage/sendmessage';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';

const firebase = {
  apiKey: "AIzaSyBaSYxPOEUXm0GjKx3yjX4PByiTR2N1EkE",
  authDomain: "ideafirebase-256b7.firebaseapp.com",
  databaseURL: "https://ideafirebase-256b7.firebaseio.com",
  projectId: "ideafirebase-256b7",
  storageBucket: "ideafirebase-256b7.appspot.com",
  messagingSenderId: "341397938822"
 }

@NgModule({
  declarations: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    NativeMapsPage,
    FingerprintPage,
    SendmessagePage,
    LoginPage,
    RegisterPage, 
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AwesomePlaces),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANaRi8e3X-0S3brU1s6p4LtXdW_UJGaNY'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
    AppRoutingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    NativeMapsPage,
    FingerprintPage,
    SendmessagePage,
    LoginPage,
    RegisterPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    File,
    FingerprintAIO,
    PlacesService,
    GoogleMaps,
    Firebase,
    FcmProvider,
    AuthenticationService
  ]
})
export class AppModule {}
