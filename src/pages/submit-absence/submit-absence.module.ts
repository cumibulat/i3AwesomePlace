import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitAbsencePage } from './submit-absence';

@NgModule({
  declarations: [
    SubmitAbsencePage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitAbsencePage),
  ],
})
export class SubmitAbsencePageModule {}
