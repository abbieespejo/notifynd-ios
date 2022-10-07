import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  watchID: number; // The id of the watchPosition interval.
  trackingLocation: boolean = false; // boolean to check if device's location is currently being watched

  constructor(private firestoreDB: DataService) {}
  
  /**
   * Once initialised, the notification documents are retrieved from Firestore db
   * and scheduled as geolocational notifications.
   */
  ngOnInit(): void {
    this.firestoreDB.prepareNotifications();
  }

  /**
   * Watches live location of device. Method subscribes to any changes in the current
   * position (x,y coordinates) of the device. 
   */
  trackLocation() {
    this.trackingLocation = true;
      // Simple geolocation API check provides values to publish
      if(this.trackingLocation === true) {
        this.watchID = navigator.geolocation.watchPosition(pos => {
          console.log("\nWATCHING... COORDS HAVE CHANGED: \n" +
              "Latitude: " + pos.coords.latitude + "\n" +
              "Longitude: " + pos.coords.longitude + "\n" +
              "------------------------------------------");
        });
      }
  }

  /**
   * Stop watching for changes to the device's location referenced by the watchID parameter.
   */
  stopTrackingLocation() {
    this.trackingLocation = false;
    navigator.geolocation.clearWatch(this.watchID);
  }

}
