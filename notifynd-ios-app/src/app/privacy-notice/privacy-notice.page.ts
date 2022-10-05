import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { DataService } from '../services/data.service';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.page.html',
  styleUrls: ['./privacy-notice.page.scss'],
})

export class PrivacyNoticePage {

  locationButtonDisabled: boolean = true;

  constructor(private firestoreDB: DataService, private diagnostic: Diagnostic, private localNotif: LocalNotifications) {
   
  }
 
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
   * Checks if the app is authorised to send notifications. If not,
   * app requests permission to send notifications.
   * 
   * Then, reads notification documents from Firestore database and
   * schedules them as location-based notifications. Notifications will only
   * be triggered if the device's coordinates are within the radius.
   */
  prepareNotifications() {
    this.localNotif.hasPermission().then(result => {
      if(!result) {
        this.localNotif.requestPermission();
      }
    });
    let notifCollection = this.firestoreDB.getNotifsInDB();
    notifCollection.subscribe(docs => {
      for (let i = 0; i <= docs.length; i++) {
        this.localNotif.schedule({
          id: i,
          title: docs[i].title,
          text: docs[i].text,
          foreground: true,
          trigger: {
            type: 'location',
            center: [docs[i].latitude, docs[i].longitude],
            radius: docs[i].radius,
            notifyOnEntry: true
          }
        });
      }
    });
  }
}
   

