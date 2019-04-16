import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalConstants } from '../../app/globalConstants';

@IonicPage()
@Component({
  selector: 'page-submit-absence',
  templateUrl: 'submit-absence.html',
})
export class SubmitAbsencePage {

  event: object = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConstants: GlobalConstants
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitAbsencePage');
  }

}
