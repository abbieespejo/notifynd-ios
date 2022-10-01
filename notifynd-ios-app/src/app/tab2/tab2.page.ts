import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
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

  constructor(private geolocation: Geolocation) { 

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



