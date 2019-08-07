import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiverDetailPage } from './receiver-detail';

@NgModule({
  declarations: [
    ReceiverDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiverDetailPage),
  ],
})
export class ReceiverDetailPageModule {}
