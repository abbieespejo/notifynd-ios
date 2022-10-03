import { Component } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Observable } from 'rxjs';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

declare var cordova: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  locationWatchStarted:boolean;
  locationSubscription:any;
  locationTraces = [];


  collection = [];

  constructor(private geolocation: Geolocation, private firestore: Firestore) { 
    // cordova.plugins.notification.local.schedule({
    //   title: 'Welcome to 10 Moana Road',
    //   trigger: {
    //       type: 'location',
    //       center: [-41.287901, 174.754702], // The center point of the geographic area.
    //       radius: 3, // The radius (measured in meters) that defines the geographic area’s outer boundary.
    //       notifyOnEntry: true
    //   }
    // });

  }

  readDb() {
    const notificationsref = collection(this.firestore, 'notifications');
    collectionData(notificationsref).subscribe((res) => {
      console.log(res);
      //this.collection = res;
    })
    
  }
  
  getCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.locationTraces.push({
        latitude:resp.coords.latitude,
        longitude:resp.coords.latitude,
        accuracy:resp.coords.accuracy,
        timestamp:resp.timestamp
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.locationSubscription = this.geolocation.watchPosition();
    this.locationSubscription.subscribe((resp) => {

      this.locationWatchStarted = true;
      this.locationTraces.push({
        latitude:resp.coords.latitude,
        longitude:resp.coords.latitude,
        accuracy:resp.coords.accuracy,
        timestamp:resp.timestamp
      });

    });
  }


}



