import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  LocationService,
  MyLocation,
  MyLocationOptions,
  Geocoder,
  GeocoderResult,
  GeocoderRequest
} from '@ionic-native/google-maps';
import {
  Geolocation
} from '@ionic-native/geolocation';
import { ShoppingCartService } from '../../services/shoppingCart';
import { ReceiverDetailPage } from '../receiver-detail/receiver-detail';

@IonicPage()
@Component({
  selector: 'page-native-maps',
  templateUrl: 'native-maps.html',
})
export class NativeMapsPage {
  map: GoogleMap;
  cameraLocation: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  loadMap() {

    let defaultLat: number = 6.1754;
    let defaultLng: number = 106.8272;

    const loader = this.loadingCtrl.create({
      content: "Getting your location..."
    });

    // using geolocation native
    // this.geolocation.getCurrentPosition({
    //     enableHighAccuracy: true
    //   })
    //   .then(
    //     loc => {
    //       loader.dismiss();
    //       this.drawMap(loc.coords.latitude, loc.coords.longitude);
    //     })
    //   .catch(
    //     error => {
    //       loader.dismiss();
    //       console.log(error);
    //       this.drawMap(defaultLat, defaultLng);
    //     });


    // using Location Service native
    let locOpt: MyLocationOptions = {
      enableHighAccuracy: true
    };
    LocationService.getMyLocation(locOpt)
      .then((loc: MyLocation) => {
        loader.dismiss();
        this.drawMap(loc.latLng.lat, loc.latLng.lng);
      });
  }

  drawMap(lat: number, lng: number) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Drag map please !',
      icon: 'blue',
      animation: 'DROP',
      draggable: true,
      position: {
        lat: lat,
        lng: lng
      }
    });

    let options: GeocoderRequest = {
      position: {
        lat: lat,
        lng: lng
      }
    };

    // initiate default camera location title
    Geocoder.geocode(options)
      .then((results: GeocoderResult[]) => {
        if (results.length > 0 && results[0].extra && results[0].extra.lines.length > 0) {
          this.cameraLocation = results[0].extra.lines[0];
        }
      })

    // marker.on(GoogleMapsEvent.MARKER_DRAG).subscribe(
    //   () => {
    //     console.log('lat 1 :: ', marker.getPosition().lat);
    //     console.log('lng 1 :: ', marker.getPosition().lng);
    //   });

    // marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(
    //   () => {
    //     console.log('lat :: ', marker.getPosition().lat);
    //     console.log('lng :: ', marker.getPosition().lng);
    //   });

    marker.showInfoWindow();

    this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(
      () => {
        let pos = this.map.getCameraTarget();
        marker.setPosition(pos);

        let options: GeocoderRequest = {
          position: pos
        };

        Geocoder.geocode(options)
          .then((results: GeocoderResult[]) => {
            if (results.length > 0 && results[0].extra && results[0].extra.lines.length > 0) {
              this.cameraLocation = results[0].extra.lines[0];
              marker.setTitle(results[0].extra.lines[0]);
              marker.showInfoWindow();
            }
          })
      });

    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  onButtonClick() {
    // alert('check :: ' + this.cameraLocation);
    this.shoppingCartSvc.setDeliveryAddress(this.cameraLocation);

    this.navCtrl.push(ReceiverDetailPage);
  }

}
