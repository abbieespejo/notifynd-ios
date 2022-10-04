import { Component } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
//import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { DataService } from '../services/data.service';

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

  constructor(private geolocation: Geolocation, private db: DataService) { }

  prepareNotifications() {
    cordova.plugins.notification.local.schedule({
      title: 'My first notification',
      text: 'Thats pretty easy...',
      foreground: true
  });
    // let notifCollection = this.db.getNotifsInDB();
    // notifCollection.subscribe(docs => {
    //   for (let i = 0; i <= docs.length; i++) {
    //     this.localNotif.schedule({
    //       id: i,
    //       title: docs[i].title,
    //       text: docs[i].text,
    //       trigger: {
    //         type: 'location',
    //         center: [docs[i].latitude, docs[i].longitude],
    //         radius: docs[i].radius,
    //         notifyOnEntry: true
    //       }
    //     });
    //   }
    // });
    // this.localNotif.getAllScheduled().then(result => {
    //   console.log("THESE ARE THE SCHEDULED NOTIFS" + result);
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



