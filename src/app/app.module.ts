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


@NgModule({
  declarations: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AwesomePlaces),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqA5AJKX2LN56yzt35g5LRZj7c3Be0i54'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AwesomePlaces,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    File,
    FingerprintAIO,
    PlacesService
  ]
})
export class AppModule {}
