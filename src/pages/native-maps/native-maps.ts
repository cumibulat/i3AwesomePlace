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
  Marker
} from '@ionic-native/google-maps';
import {
  Geolocation
} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-native-maps',
  templateUrl: 'native-maps.html',
})
export class NativeMapsPage {
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {}

  loadMap() {

    let currLat: number;
    let currLng: number;

    const loader = this.loadingCtrl.create({
      content: "Getting your location..."
    });
    this.geolocation.getCurrentPosition({
        enableHighAccuracy: true
      })
      .then(
        loc => {
          loader.dismiss();
          currLat = loc.coords.latitude;
          currLng = loc.coords.longitude;

          let mapOptions: GoogleMapOptions = {
            camera: {
              target: {
                lat: currLat,
                lng: currLng
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
              lat: currLat,
              lng: currLng
            }
          });

          marker.showInfoWindow();

          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
          });
        })
      .catch(
        error => {
          loader.dismiss();
          console.log(error);
        });


  }

  ionViewDidLoad() {
    this.loadMap();
  }

  onButtonClick(ev: any) {
    alert('check :: ' + ev);
  }

}
