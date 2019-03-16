import {
  Component
} from '@angular/core';
import {
  Location
} from '../../models/location';
import {
  NavParams,
  ViewController
} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  marker: Location;
  map: GoogleMap;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    this.viewCtrl.dismiss({
      location: this.marker
    });
  }

  onAbort() {
    this.viewCtrl.dismiss();
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

  ionViewDidLoad(){
    this.loadMap();
  }
}
