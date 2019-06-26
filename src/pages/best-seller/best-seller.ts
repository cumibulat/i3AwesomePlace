import {
  StorageService
} from './../../services/storage';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  Storage
} from "@ionic/storage";

/**
 * Generated class for the BestSellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-seller',
  templateUrl: 'best-seller.html',
})
export class BestSellerPage {

  public cntShoppingCart : number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private storageService: StorageService) {

    // this.storageService.storageObs.subscribe((newValue) => {
    //   // This code will execute when the property has changed and also
    //   // you'll have access to the object with the information that
    //   // your service sent in the next() call.
      
    //   newValue.get('localShoppingCart').then(res => {
    //     console.log('cek dl gansss :: ', res);
    //   })
    // });


    this.storageService.countShoppingCart.subscribe((data) => {
      console.log('halow : ', data);
      this.cntShoppingCart = data;
    });

  }


  addToCart() {
    console.log('masuk ni !');
    const dt = new Date();
    // this.storage.get('localShoppingCart').then(res => {
    //   console.log('ini apa ? ', res);

    //   let lShopCart: String[] = [];
    //   if (res) {
    //     lShopCart = res;
    //   }
      
    //   lShopCart.push('test ' + dt.getTime());
    //   console.log('cek dl ya gan !! ', lShopCart);
    //   this.storage.set('localShoppingCart', lShopCart);
      
    // })

    this.storageService.updateCount(Math.floor(Math.random() * 10));


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestSellerPage');
  }

}
