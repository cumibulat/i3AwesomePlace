import {
  Storage
} from "@ionic/storage";
import {
  Injectable
} from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ShoppingCartService {

public countShoppingCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private storage: Storage) {}

  public setStorage(key: string, value: any): void {
    this.storage.set(key, value);
  }

  public addToShoppingCart(idProduct: number): void {
    this.storage.get('localShoppingCart').then(res => {
      let lShopCart: any[] = [];
      if (res) {
        lShopCart = res;
      }

      const cartIdx = lShopCart.findIndex((obj => obj.id == idProduct));

      if (cartIdx != -1) {
        // if product already exist then increase qty by 1.
        let qtyProduct = lShopCart[cartIdx].qty;
        lShopCart[cartIdx].qty = qtyProduct + 1;
      } else {
        // if product not exist in cart then create new product
        let objProduct = {
          id: idProduct,
          qty: 1,
        }
        lShopCart.push(objProduct);
      }

      this.countShoppingCart.next(lShopCart.length);

      this.storage.set('localShoppingCart', lShopCart);
    })
  }

  public refreshCart(){
    this.storage.get('localShoppingCart').then(res => {
      let lShopCart: any[] = [];
      if (res) {
        // console.log('cek res :: ', res)
        lShopCart = res;
      }
      // console.log('cek lShopCart :: ', lShopCart.length)
      this.countShoppingCart.next(lShopCart.length);
    })
  }

  public removeFromShoppingCart(idProduct: number): void {
    console.log('masuk removeFromShoppingCart ')
  }

  public setDeliveryAddress(addr: String): void {
    this.storage.set('deliveryAddress', addr);
  }

  public getDeliveryAddress() {
    return this.storage.get('deliveryAddress');
  }

}
