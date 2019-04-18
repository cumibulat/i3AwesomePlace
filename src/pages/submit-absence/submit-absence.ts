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

@IonicPage()
@Component({
  selector: 'page-submit-absence',
  templateUrl: 'submit-absence.html',
})
export class SubmitAbsencePage {

  formAbsence: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConstants: GlobalConstants,
    private formBuilder: FormBuilder
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
      console.log("success!")
      console.log(this.formAbsence.value);

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitAbsencePage');
  }

}
