import { ChartingPageModule } from './../pages/charting/charting.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { LoginPageModule } from './../pages/login/login.module';
import { SendmessagePageModule } from './../pages/sendmessage/sendmessage.module';
import { FingerprintPageModule } from './../pages/fingerprint/fingerprint.module';
import { SetLocationPageModule } from './../pages/set-location/set-location.module';
import { PlacePageModule } from './../pages/place/place.module';
import { AddPlacePageModule } from './../pages/add-place/add-place.module';
import { ProfileService } from './../services/profile';
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
import { ReactiveFormsModule } from '@angular/forms';

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
import { HttpModule } from '@angular/http';
import { LoaderProvider } from '../providers/loader/loader';
import { PopupNotifProvider } from '../providers/popup-notif/popup-notif';
import { ChartingPage } from '../pages/charting/charting';
import { GlobalConstants } from './globalConstants';
import { SubmitAbsencePage } from '../pages/submit-absence/submit-absence';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeMapsPageModule } from '../pages/native-maps/native-maps.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { SubmitAbsencePageModule } from '../pages/submit-absence/submit-absence.module';
import { BestSellerPageModule } from '../pages/best-seller/best-seller.module';
import { StorageService } from '../services/storage';

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
    // AddPlacePage,
    // PlacePage,
    // SetLocationPage,
    // NativeMapsPage,
    // FingerprintPage,
    // SendmessagePage,
    // LoginPage,
    // RegisterPage, 
    // ProfilePage,
    // ChartingPage,
    // SubmitAbsencePage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(AwesomePlaces,
      {
        dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        dayShortNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      }),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANaRi8e3X-0S3brU1s6p4LtXdW_UJGaNY'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
    AppRoutingModule,
    AddPlacePageModule,
    PlacePageModule,
    SetLocationPageModule,
    NativeMapsPageModule,
    FingerprintPageModule,
    SendmessagePageModule,
    LoginPageModule,
    RegisterPageModule,
    ProfilePageModule,
    ChartingPageModule,
    SubmitAbsencePageModule,
    BestSellerPageModule
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
    ProfilePage,
    ChartingPage,
    SubmitAbsencePage
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
    AuthenticationService,
    ProfileService,
    LoaderProvider,
    PopupNotifProvider,
    GlobalConstants,
    AuthProvider,
    AngularFireAuth,
    StorageService
  ]
})
export class AppModule {}
