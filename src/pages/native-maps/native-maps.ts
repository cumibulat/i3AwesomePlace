import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-native-maps',
  templateUrl: 'native-maps.html',
})
export class NativeMapsPage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyANaRi8e3X-0S3brU1s6p4LtXdW_UJGaNY',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyANaRi8e3X-0S3brU1s6p4LtXdW_UJGaNY'
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

  ionViewDidLoad() {
    this.loadMap();
  }

}
