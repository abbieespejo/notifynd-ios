import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.page.html',
  styleUrls: ['./privacy-notice.page.scss'],
})

export class PrivacyNoticePage implements OnInit {

  // continue button is disabled if location permissions are not accepted
  locationButtonDisabled: boolean = true; 

  // display text depending if notifications are authorised by the user
  checkNotifsAllowed: boolean = true;

  constructor(private diagnostic: Diagnostic, private localNotif: LocalNotifications) {}

  /**
   * Once initialised, check if the app is authorised to send notifications.
   * If true, then set boolean to true so that the app will display text
   * saying that notifications are already enabled.
   */
  ngOnInit(): void {
    this.localNotif.hasPermission().then(result => {
      if(result) {
        this.checkNotifsAllowed = false;
      }
    });
  }
 
  /**
   * Checks the current location authorisation status. If it's already enabled, the user may continue
   * to /tabs/tab1 page by enabling the 'continue' button by setting boolean to false. 
   * 
   * The user is requested to authorise location.
   */
  allowLocationTracking() {
    let successCallback = (authStatus) => {
        if(authStatus === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE || this.diagnostic.permissionStatus.GRANTED) {
          this.locationButtonDisabled = false;
        }
      }
    let errorCallback = (e) => console.log(e);
    this.diagnostic.requestLocationAuthorization().then(successCallback).catch(errorCallback);
  }

   /**
   * Requests user to allow notifications. If user accepts
   * then the app will display text saying that notifications are 
   * already enabled.
   */
  allowNotifications() {
    this.localNotif.requestPermission().then(onfulfilled => {
      if(onfulfilled) {
        this.checkNotifsAllowed = false;
      }
    })
  }
    
}
   

