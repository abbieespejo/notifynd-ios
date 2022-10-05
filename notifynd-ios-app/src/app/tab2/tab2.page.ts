import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notif: any;
  
  locationWatchStarted:boolean;
  locationSubscription:any;
  locationTraces = [];

  constructor(private geolocation: Geolocation,
    private db: DataService, private localNotif: LocalNotifications) { }

  scheduleLocationBasedNotif() {
    this.localNotif.schedule({
      id: 10,
      title: 'Welcome home!',
      foreground: true,
      trigger: {
        type: 'location',
        center: [-41.287901, 174.754702], 
        radius: 5, 
        notifyOnEntry: true,
      }
    });
  }
  
  testNotif() {
    this.localNotif.schedule({
      id: 5,
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

  getScheduledNotifs() {
    this.localNotif.get(10).then(data => {
      console.log("\nRETRIEVED NOTIFICATION:\n" +
      "Title: " + data.title + "\n" +
      "Text: " + data.text + "\n" + 
      "Trigger details:\n" +
      "Type of trigger: " + data.trigger.type + "\n" +
      "Latitude: " + data.trigger.center[0] + "\n" +
      "Longitude: " + data.trigger.center[1] + "\n" +
      "Radius: " + data.trigger.radius + "\n" +
      "Notify on entry: " + data.trigger.notifyOnEntry + "\n");
    })
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
}