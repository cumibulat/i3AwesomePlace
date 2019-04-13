import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NativeMapsPage } from './native-maps';

@NgModule({
  declarations: [
    NativeMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(NativeMapsPage),
  ],
})
export class NativeMapsPageModule {}
