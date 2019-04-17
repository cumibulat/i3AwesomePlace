import { LoaderProvider } from './../../providers/loader/loader';
import { AuthenticationService } from './../../services/authentication';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthenticationService,
    private loader: LoaderProvider
    ) {
  }

  login(form: NgForm){
    console.log('test jalan gan !!', form);
    this.loader.present("Signing In..");
    this.authService.login(form.value.email, form.value.password);
    this.loader.dismiss();
  }

  goToRegister(){
    console.log('jalan ga ni')
    this.navCtrl.push(RegisterPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
