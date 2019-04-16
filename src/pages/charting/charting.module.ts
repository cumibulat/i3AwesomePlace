import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartingPage } from './charting';

@NgModule({
  declarations: [
    ChartingPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartingPage),
  ],
})
export class ChartingPageModule {}
