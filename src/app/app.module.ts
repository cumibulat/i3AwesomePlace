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


@NgModule({
  declarations: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    NativeMapsPage,
    FingerprintPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AwesomePlaces),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANaRi8e3X-0S3brU1s6p4LtXdW_UJGaNY'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    NativeMapsPage,
    FingerprintPage
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
    GoogleMaps 
  ]
})
export class AppModule {}
