import {
  Storage
} from "@ionic/storage";
import {
  Injectable
} from "@angular/core";
import {
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs';
import {
  map
} from 'rxjs-compat/operators/map';
import { AngularFirestore } from "angularfire2/firestore";
@Injectable()
export class ProfileService {

  private userProfile: any;
  constructor(
    private http: Http,
    private fireStore: AngularFirestore
  ) {

  }

  fetchProfile() {
    
    return this.fireStore.collection<any>('listMessages');
    
    // return this.http.get('https://firestore.googleapis.com/v1/projects/ideafirebase-256b7/databases/(default)/documents/listMessages/')
    // .subscribe((response: Response) => {

    //   console.log('cek dl ya gans :: ', response)
    //   return response.json();
    // });
      // .map((response: Response) => {

      //   console.log('cek dl ya gans :: ', response)
      //   return response.json();
      // })
    // .do((data) => {
    //     this.shoppingCart = data;
    // });



  }

}
