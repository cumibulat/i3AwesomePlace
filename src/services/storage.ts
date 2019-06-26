import {
  Storage
} from "@ionic/storage";
import {
  Injectable
} from "@angular/core";
import {
  Observable, BehaviorSubject
} from 'rxjs';


@Injectable()
export class StorageService {

  private storageObserver: any;
  public storageObs: any;

  constructor(private storage: Storage) {
    this.storageObserver = null;

    // this.storageObs = Observable.create(observer => {
    //   this.storageObserver = observer;
    // });
    this.storageObs = new BehaviorSubject(this.storage);
  }

  public setStorage(key: string, value: any): void {

    // This method changes the value of the storage
    // ...
    this.storage.set(key, value);

    // Notify to the subscriptor that the value has changed
    this.storageObserver.next(this.storage);
  }
}
