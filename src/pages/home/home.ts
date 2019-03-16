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

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  addPlacePage = AddPlacePage;
  places: Place[] = [];
  map: GoogleMap;

  constructor(
    private placesSvc: PlacesService,
    private modalCtrl: ModalController,
    private faio: FingerprintAIO,
    private toastCtrl: ToastController    
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

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAqA5AJKX2LN56yzt35g5LRZj7c3Be0i54',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAqA5AJKX2LN56yzt35g5LRZj7c3Be0i54'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Test Cumi !',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });

    marker.showInfoWindow();

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {
      place: place,
      index: index
    });
    modal.present();
  }

  ionViewDidLoad(){
    // this.loadMap();
  }

  ionViewWillEnter() {
    this.places = this.placesSvc.loadPlaces();
  }

}
