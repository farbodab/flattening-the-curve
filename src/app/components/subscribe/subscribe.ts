import { Component, Input } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.html',
    styleUrls: ['./subscribe.scss']
})

export class SubscribeComponent {

  @Input() regions: any;
  is_full = true;
  email = null;
  frequency = 'weekly'

  constructor(private _snackBar: MatSnackBar, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }


    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 10000
      });
    }

  submitted() {
    if (this.email!==null && this.frequency!==null && this.regions!==null){
      var payload = {"email":this.email, "frequency":this.frequency, "regions":this.regions};
      this.fetchDataObj(payload)
      this.openSnackBar("You're subscribed! We just sent you a confirmation. Check your email's spam folder in case you don't see it.", 'Dismiss')
    }
    else {
      this.openSnackBar("Something went wrong", 'Dismiss')
    }
  }

  fetchDataObj(content) {
    this.api_service.post_mail_obj(content).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

}
