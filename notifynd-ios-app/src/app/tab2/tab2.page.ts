import { Component } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private localNotifications: LocalNotifications) { 
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'This is an example title!',
      text: 'you have just received a new notification',
      data: { mydata: "This is a hidden, lucky message!" }
    });
  }

}
