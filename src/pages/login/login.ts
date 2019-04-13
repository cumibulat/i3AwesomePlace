import { AuthenticationService } from './../../services/authentication';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthenticationService) {
  }

  login(){
    console.log('test jalan gan !!');
    this.authService.login();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
