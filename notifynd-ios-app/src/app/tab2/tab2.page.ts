import { Component } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
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

  constructor(private geolocation: Geolocation,
    private db: DataService,
    private localNotif: LocalNotifications, 
    private diagnostic: Diagnostic) { 
    }

  scheduleLocationBasedNotif() {
    cordova.plugins.notification.local.schedule({
      id: 3,
      title: 'Welcome to 10 Moana Road',
      trigger: {
        type: 'location',
        center: [-41.287901, 174.754702], // The center point of the geographic area.
        radius: 3, // The radius (measured in meters) that defines the geographic area’s outer boundary.
        notifyOnEntry: true,
        notifyOnExit: true
      }
    });
    // let result = this.localNotif.getScheduledIds()
    this.localNotif.getScheduledIds().then(data => {
      console.log("\nSCHEDULED NOTIFS IDs: " + data);
    });
    this.localNotif.getAll().then(data => {
      console.log("\nALL NOTIF OBJECTS: \n" +
        "--> " + data + "\n" +
        "------------------------------------------");
    });
  }
  
  testNotif() {
    this.localNotif.schedule({
      title: 'This is a test notification',
      text: 'Hello!',
      foreground: true
    });
  }

  testMultipleNotifs() {
    this.localNotif.schedule([
      {
        id: 1,
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
      },
      {
        id: 2,
        title: 'My second notification',
        text: 'whoever said it was easy is a liar!',
        foreground: true
      }
    ]);
  }


  getCoordinates() {
    this.locationSubscription = this.geolocation.watchPosition();
    this.locationSubscription.subscribe((resp) => {
      console.log("\nWATCHING... COORDS HAVE CHANGED: \n" +
        "Latitude: " + resp.coords.latitude + "\n" +
        "Longitude: " + resp.coords.longitude + "\n" +
        "------------------------------------------");
    });
  }

  prepareNotifications() {
    let notifCollection = this.db.getNotifsInDB();
    notifCollection.subscribe(docs => {
      for (let i = 0; i <= docs.length; i++) {
        console.log("id: " + i + "\n" +
        "title: " + docs[i].title + "\n" +
        "text: " + docs[i].title + "\n" +
        "center: " + docs[i].latitude + ", " + docs[i].longitude + "\n" +
        "radius: " + docs[i].radius + "\n");
        this.localNotif.schedule({
          id: i,
          title: docs[i].title,
          text: docs[i].text,
          foreground: true,
          trigger: {
            // type: 'location',
            center: [docs[i].latitude, docs[i].longitude],
            radius: docs[i].radius,
            notifyOnEntry: true
          }
        });
      }
    });
  }

  getCoordinatesV2() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.locationTraces.push({
        latitude:resp.coords.latitude,
        longitude:resp.coords.longitude,
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
  jfsdfjklf() {
   this.localNotif.schedule({
      id: 3,
      title: 'Welcome to 10 Moana Road',
      trigger: {
        // type: 'location',
        center: [-41.287901, 174.754702], // The center point of the geographic area.
        radius: 3, // The radius (measured in meters) that defines the geographic area’s outer boundary.
        notifyOnEntry: true,
        notifyOnExit: true
      }
    });

  }
}



