import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class PopupNotifProvider {

  constructor(
    private alertCtrl: AlertController) {}

  show(title: string, subTitle: string, buttons: Array<string>): void{
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

}
