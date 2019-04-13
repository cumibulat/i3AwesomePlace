import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderProvider {

  loader: any;

  constructor(
    private loadingCtrl: LoadingController
  ) {}

  present(msg = `Please wait...`) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  dismiss() {
    this.loader.dismiss();
  }

}
