import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalController,
  ToastController
} from 'ionic-angular';
import {
  AddPlacePage
} from '../add-place/add-place';
import {
  Place
} from '../../models/place';
import {
  PlacesService
} from '../../services/places';
import {
  PlacePage
} from '../place/place';
import {
  FingerprintAIO
} from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(
    private placesSvc: PlacesService,
    private modalCtrl: ModalController,
    private faio: FingerprintAIO,
    private toastCtrl: ToastController,
  ) {
    // this.addPlacePage = AddPlacePage;  
  }

  ngOnInit() {

    this.faio.isAvailable()
      .then(
        () => {
          console.log('yes device have fingerprint !! ');
          this.faio.show({
              clientId: 'Fingerprint-Demo',
              clientSecret: 'password', //Only necessary for Android
              disableBackup: true, //Only for Android(optional)
              localizedFallbackTitle: 'Use Pin', //Only for iOS
              localizedReason: 'Please authenticate' //Only for iOS
            })
            .then((result: any) => {
              console.log(result)
              const toast = this.toastCtrl.create({
                message: 'Fingerprint recognized..',
                duration: 2500,
              });
              toast.present();
            })
            .catch((error: any) => {
              console.log(error);
              const toast = this.toastCtrl.create({
                message: 'Error authenticate fingerprint..',
                duration: 2500,
              });
              toast.present();
            });
        }
      )
      .catch(
        () => {
          const toast = this.toastCtrl.create({
            message: 'Sorry Device is didnt have fingerprint sensor',
            duration: 2500,
          });
          toast.present();
        }
      );


    this.placesSvc.fetchPlacesFromStorage()
      .then(
        (places: Place[]) => {
          this.places = places;
        }
      );
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {
      place: place,
      index: index
    });
    modal.present();
  }

  ionViewWillEnter() {
    this.places = this.placesSvc.loadPlaces();
  }

}
