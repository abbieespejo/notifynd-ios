import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';


@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.page.html',
  styleUrls: ['./privacy-notice.page.scss'],
})

export class PrivacyNoticePage {

  buttonDisabled: boolean = true;

  constructor(private diagnostic: Diagnostic) {
   
  }
 
  allowLocationTracking() {
    let successCallback = (authStatus) => {
        if(authStatus === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE || this.diagnostic.permissionStatus.GRANTED) {
          this.buttonDisabled = false;
        }
      }
    let errorCallback = (e) => console.log(e);
    this.diagnostic.requestLocationAuthorization().then(successCallback).catch(errorCallback);
  }
}
   

