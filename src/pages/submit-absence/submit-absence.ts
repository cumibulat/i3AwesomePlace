import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  GlobalConstants
} from '../../app/globalConstants';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { FcmProvider } from '../../providers/fcm/fcm';
import { LoaderProvider } from '../../providers/loader/loader';
import { PopupNotifProvider } from '../../providers/popup-notif/popup-notif';
import { map } from 'rxjs-compat/operators/map';

@IonicPage()
@Component({
  selector: 'page-submit-absence',
  templateUrl: 'submit-absence.html',
})
export class SubmitAbsencePage {

  formAbsence: FormGroup;
  submitAttempt: boolean = false;
  segmentVal: string = "submitAbsence";
  listAbsence: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConstants: GlobalConstants,
    private formBuilder: FormBuilder,
    private fcmProvider: FcmProvider,
    private loader: LoaderProvider,
    private popupNotif: PopupNotifProvider
  ) {

    this.formAbsence = formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      absenceType: ['', Validators.required],
      remark: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      duration: [0],
      attachmentName: [''],
      attachmentMimeType: [''],
      attachmentBase64: ['']
    });
  }

  onDateChanged() {
    if (this.formAbsence.get('dateStart').value !== '' && this.formAbsence.get('dateEnd').value !== '') {

      console.log('jalan ga sih ?')
      this.formAbsence.patchValue({duration: 3});

    }
  }

  doSubmit(){
    this.submitAttempt = true;

    if(!this.formAbsence.valid){
    } 
    else {
      this.loader.present("Submitting Absence Data ..");
      this.fcmProvider.saveDataToFirestore('listAbsence', this.formAbsence.value)
      .then(() => {
        this.loader.dismiss();
        this.submitAttempt = false;
        this.popupNotif.show("Success", "Submit Absence Data Success.", ["Close"]);
        this.formAbsence.reset();
      })
      .catch( 
        error => {
          this.loader.dismiss();
          this.popupNotif.show("Error", "Submit Absence Data Failed.", ["Close"]);
        }
      );
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formAbsence.patchValue({
          attachmentName: file.name,
          attachmentMimeType: file.type,
          attachmentBase64: (<string>reader.result).split(',')[1],
        });
      };
    }
  }

  segmentChanged(evt){
    if(evt.value == 'listAbsence') {
      //need to refresh our list 
      this.refreshListAbsence();
    }
  }

  refreshListAbsence(){
    this.loader.present("Getting list Absence..");
    const tmpCollection = this.fcmProvider.getDataFromFirestore('listAbsence');
    this.listAbsence = tmpCollection.snapshotChanges().pipe(
      map((actions:any) => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );

    // this.listAbsence.valueChanges().subscribe((vv) => {
    //   console.log('hasil :: ', vv)
    // })
    
    this.loader.dismiss();
  }

  ionViewDidLoad() {
    this.segmentVal = "submitAbsence";
  }

}
