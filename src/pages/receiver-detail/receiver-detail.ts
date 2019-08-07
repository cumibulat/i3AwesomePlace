import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingCartService } from '../../services/shoppingCart';

/**
 * Generated class for the ReceiverDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receiver-detail',
  templateUrl: 'receiver-detail.html',
})
export class ReceiverDetailPage {

  formReceiverDetail: FormGroup;
  submitAttempt: boolean = false;
  deliveryAddress: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private shoppingCartSvc: ShoppingCartService) {

      this.formReceiverDetail = formBuilder.group({
        unit_number: ['', Validators.compose([Validators.maxLength(200), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        driver_note: ['', Validators.compose([Validators.maxLength(1000), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReceiverDetailPage');
    this.shoppingCartSvc.getDeliveryAddress().then((data)=>{
      console.log("jalan ni load address");
      this.deliveryAddress = data;
    });
  }

}
