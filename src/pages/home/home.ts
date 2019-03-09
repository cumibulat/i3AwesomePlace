import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  addPlacePage = AddPlacePage;
  places: Place[] = [];
  
  constructor(
    private placesSvc: PlacesService,
    private modalCtrl: ModalController,
    ) {
    // this.addPlacePage = AddPlacePage;  
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }

  ionViewWillEnter(){
    this.places = this.placesSvc.loadPlaces();
  }

}
