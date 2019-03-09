import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController, ToastController, NavController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { PlacesService } from '../../services/places';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: -6.197291332275369,
    lng: 106.82453977546311
  };

  locationIsSet = false;
  imageUrl = 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg';

  constructor (
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesSvc: PlacesService,
    private navCtrl: NavController,
    
  ){}

  onSubmit(f: NgForm){
    this.placesSvc.addPlaces(f.value.title, f.value.description, this.location, this.imageUrl);
    f.reset();
    this.location = {
      lat: -6.197291332275369,
      lng: 106.82453977546311
    };
    this.locationIsSet = false;
    
    this.navCtrl.push(HomePage);

  }

  onLocate(){
    const loader = this.loadingCtrl.create({
        content: "Getting your location..."
      });
    loader.present();
    this.geolocation.getCurrentPosition({enableHighAccuracy:true})
      .then(
        loc => {
          loader.dismiss();
          this.location.lat = loc.coords.latitude;
          this.location.lng = loc.coords.longitude;
          this.locationIsSet = true;
        })
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: "Could not get location, please pick it manually",
            duration: 2000,
          })
          toast.present();
        }
      );
  }

  onOpenMap(){
    const modal = this.modalCtrl.create(
      SetLocationPage,
      {location: this.location, isSet: this.locationIsSet}
      );
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data){
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onTakePhoto(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageUrl = base64Image;
     }, (err) => {
      // Handle error
     });
  }

}
