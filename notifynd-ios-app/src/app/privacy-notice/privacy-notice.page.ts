import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.page.html',
  styleUrls: ['./privacy-notice.page.scss'],
})
export class PrivacyNoticePage implements OnInit {

  constructor(private geolocation: Geolocation) {
  }
    

  ngOnInit() {
  }
  allowLocationTracking() {
    this.geolocation.getCurrentPosition().then((resp) => {
    }).catch((error) => {
      console.log('Error getting location', error);
    });

   }
}
