import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BestSellerPage } from './best-seller';

@NgModule({
  declarations: [
    BestSellerPage,
  ],
  imports: [
    IonicPageModule.forChild(BestSellerPage),
  ],
})
export class BestSellerPageModule {}
