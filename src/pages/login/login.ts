import { LoaderProvider } from './../../providers/loader/loader';
import { AuthenticationService } from './../../services/authentication';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { PopupNotifProvider } from '../../providers/popup-notif/popup-notif';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthenticationService,
    private loader: LoaderProvider,
    private popupNotif: PopupNotifProvider
    ) {
  }

  login(form: NgForm){
    this.loader.present("Signing In..");
    this.authService.login(form.value.email, form.value.password)
    .then((user) => {
      this.authService.setAuthenticated();
      this.loader.dismiss();
      this.popupNotif.show("Success", "Welcome, " + user.user.email, ["Close"]);
    })
    .catch((err) => {
      this.loader.dismiss();
      this.popupNotif.show("Error", err.message, ["Close"]);
    });
    this.loader.dismiss();
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  
  ionViewDidLoad() {
  }

}
