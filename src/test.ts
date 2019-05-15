// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule }                           from '@angular/forms';
import { getTestBed, TestBed }                                        from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { TranslateModule, TranslateService }                          from '@ngx-translate/core';
import {
  App,
  Config,
  DeepLinker,
  Form,
  IonicModule,
  Keyboard,
  DomController,
  MenuController,
  NavController,
  Platform,
  NavParams,
  LoadingController,
  AlertController,
  GestureController,
}                                   from 'ionic-angular';
import { ConfigMock, PlatformMock, LoadingControllerMock } from 'ionic-mocks';
import { GlobalConstants } from './app/globalConstants';
import { AuthenticationService } from './services/authentication';
// import { ClickersServiceMock }      from './services/clickers.mock';
// import { ClickersService }          from './services';
// import { TranslateServiceMock }     from './services/translate.mock';
// import { TranslatePipeMock }        from './pipes/translate.pipe.mock';

import {
  Storage, IonicStorageModule
} from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from 'angularfire2';
import { LoaderProvider } from './providers/loader/loader';
import { PopupNotifProvider } from './providers/popup-notif/popup-notif';
// import { LoadingControllerMock } from './services/loading.mock';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

const firebase = {
  apiKey: "AIzaSyBaSYxPOEUXm0GjKx3yjX4PByiTR2N1EkE",
  authDomain: "ideafirebase-256b7.firebaseapp.com",
  databaseURL: "https://ideafirebase-256b7.firebaseio.com",
  projectId: "ideafirebase-256b7",
  storageBucket: "ideafirebase-256b7.appspot.com",
  messagingSenderId: "341397938822"
 }

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
        // TranslatePipeMock,
      ],
      providers: [
        App, Form, Keyboard, DomController, MenuController, NavController, 
          GlobalConstants, AuthenticationService, AngularFireAuth, LoaderProvider,
          PopupNotifProvider, AlertController,GestureController,
        {provide: Platform, useFactory: () => PlatformMock.instance()},
        {provide: Config, useFactory: () => ConfigMock.instance()},
        {provide: DeepLinker, useFactory: () => ConfigMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        // {provide: ClickersService, useClass: ClickersServiceMock},
        // {provide: TranslateService, useClass: TranslateServiceMock},
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(firebase), 
        // TranslateModule,
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}