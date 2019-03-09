import {
  Place
} from "../models/place";
import {
  Location
} from "../models/location";

import {
  Storage
} from "@ionic/storage";
import {
  Injectable
} from "@angular/core";
import {
  File
} from "@ionic-native/file";


declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(
    private storage: Storage,
    private file: File
  ) {}

  addPlaces(
    title: string,
    description: string,
    location: Location,
    imageUrl: string,
  ) {
    const place = new Place(title, description, location, imageUrl);

    this.places.push(place);
    this.storage.set('places', this.places)
      .then(
        data => {

        }
      )
      .catch(
        err => {
          // this.places.splice(this.places.length -1, 1);
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }


  loadPlaces() {
    return this.places.slice();
  }

  fetchPlacesFromStorage() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places.slice();
        }
      )
      .catch(
        err => {
          console.log('cek dl gans :: ', err)
        }
      );
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeFile(place);
        }
      )
      .catch(
        err => {
          console.log('error when delete place :', err);
        }
      );
  }

  private removeFile(place: Place) {
    const fileName = place.imagePath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, fileName)
      .then(
        () => {
          console.log('File successfully removed');
        }
      )
      .catch(
        () => {
          console.log('Error when removing file');
          this.addPlaces(place.title, place.description, place.location, place.imagePath);
        }
      );

  }
}
