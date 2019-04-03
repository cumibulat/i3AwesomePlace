import { FingerprintPage } from './../fingerprint/fingerprint';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalController
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
import { NativeMapsPage } from '../native-maps/native-maps';
import { SendmessagePage } from '../sendmessage/sendmessage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  addPlacePage = AddPlacePage;
  nativeMapsPage = NativeMapsPage;
  fingeprintPage = FingerprintPage;
  sendMsgPage = SendmessagePage;
  places: Place[] = [];
  
  constructor(
    private placesSvc: PlacesService,
    private modalCtrl: ModalController,
  ) {
    // this.addPlacePage = AddPlacePage;  
  }

  ngOnInit() {
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
