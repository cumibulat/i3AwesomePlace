import {
  Injectable
} from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
@Injectable()
export class ProfileService {

  private userProfile: any;
  constructor(
    private fireStore: AngularFirestore
  ) {

  }

  fetchProfile() {
    return this.fireStore.collection<any>('listMessages');
  }

}
