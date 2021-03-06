import {
  HttpClient
} from '@angular/common/http';
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
import {
  ListProduct
} from '../../models/listproduct';
import {
  Product
} from '../../models/product';
import { ProductService } from '../../services/product';
import { ShoppingCartService } from '../../services/shoppingCart';
import { NativeMapsPage } from '../native-maps/native-maps';

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

  public cntShoppingCart: number;
  public listBestSeller: Product[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private storageService: StorageService,
    private http: HttpClient,
    private productSvc: ProductService,
    private shoppingCartSvc: ShoppingCartService) {

    // this.storageService.storageObs.subscribe((newValue) => {
    //   // This code will execute when the property has changed and also
    //   // you'll have access to the object with the information that
    //   // your service sent in the next() call.

    //   newValue.get('localShoppingCart').then(res => {
    //     console.log('cek dl gansss :: ', res);
    //   })
    // });


    
  }


  addToCart(item: Product) {
    // const dt = new Date();
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

    // this.storageService.updateCount(Math.floor(Math.random() * 10));

    this.shoppingCartSvc.addToShoppingCart(item);


  }

  doCheckout() {
    this.navCtrl.push(NativeMapsPage);
  }

  ionViewDidLoad() {
    this.shoppingCartSvc.countShoppingCart.subscribe((data) => {
      this.cntShoppingCart = data;
    });

    this.productSvc.fetchBestSeller()
    .subscribe((listProduct: ListProduct) => {
      this.listBestSeller = listProduct.data;
    });

    this.shoppingCartSvc.refreshCart();
  }

}
