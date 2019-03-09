import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';


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

  constructor (
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ){}

  onSubmit(f: NgForm){
    console.log('isi form : ', f.value);
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
          console.log('error gans :: ', error);
          
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

  }

}
