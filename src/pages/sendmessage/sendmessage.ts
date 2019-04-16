import { PopupNotifProvider } from './../../providers/popup-notif/popup-notif';
import { LoaderProvider } from './../../providers/loader/loader';
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

  segmentVal: string = "newMessage";
  listMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcmProvider: FcmProvider,
    private loader: LoaderProvider,
    private popupNotif: PopupNotifProvider
    ) {
  }

  onSubmit(f: NgForm){
    this.loader.present("Sending Push Notification..");
    this.fcmProvider.saveMessageToFirestore({
      title: f.value.title,
      message: f.value.message
    })
    .then(() => {
      this.loader.dismiss();
      this.popupNotif.show("Success", "Send Push Notification Success.", ["Close"]);
    }, 
    error => {
      this.loader.dismiss();
      this.popupNotif.show("Error", "Send Push Notification Failed.", ["Close"]);
    });

    f.reset();
  }

  segmentChanged(evt){
    if(evt.value == 'listMessage') {
      //need to refresh our list 
      this.refreshListMessage();
    }
  }

  refreshListMessage(){
    this.loader.present("Getting list message..");
    this.listMessage = this.fcmProvider.fetchListMessage().valueChanges();
    this.loader.dismiss();
  }

  ionViewDidLoad() {
    this.segmentVal = "newMessage";
    this.refreshListMessage();
  }

}
