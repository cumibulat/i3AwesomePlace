import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileService } from '../../services/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileSvc: ProfileService) {
  }

  empProfile : any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.empProfile = this.profileSvc.fetchProfile().valueChanges();
  }

}
