import { Component } from '@angular/core';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
declare var cordova: any;


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() { 
  }

  scheduleNotification() {
    cordova.plugins.notification.local.schedule({
      title: 'My first notification',
      text: 'Thats pretty easy...',
      foreground: true
  });
  }
}
