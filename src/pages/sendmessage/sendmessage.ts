import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FcmProvider } from '../../providers/fcm/fcm';

/**
 * Generated class for the SendmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendmessage',
  templateUrl: 'sendmessage.html',
})
export class SendmessagePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcmProvider: FcmProvider
    ) {
  }

  onSubmit(f: NgForm){
    this.fcmProvider.saveMessageToFirestore({
      title: f.value.title,
      message: f.value.message
    });

    f.reset();
    
    
    // this.navCtrl.push(HomePage);

  }

  ionViewDidLoad() {
  }

}
