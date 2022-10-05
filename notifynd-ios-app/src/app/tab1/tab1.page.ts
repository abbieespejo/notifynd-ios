import { Component } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { DataService } from '../services/data.service';

 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  buttonDisabled: boolean = false;

  constructor(private localNotif: LocalNotifications, private firestoreDB: DataService) {}

  
 
  prepareNotifications() {
    let notifCollection = this.firestoreDB.getNotifsInDB();
    notifCollection.subscribe(docs => {
      for (let i = 0; i <= docs.length; i++) {
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

  checkNotifications() {
    this.localNotif.getScheduledIds().then(result => {
      for(let i = 0; i <= result.length; i++) {
        this.localNotif.get(i).then(data => {
          console.log("\nRETRIEVED NOTIFICATION: " + data[i].id +"\n" +
          "Title: " + data[i].title + "\n" +
          "Text: " + data[i].text + "\n" + 
          "Trigger details:\n" +
          "Latitude: " + data[i].trigger.center[0] + "\n" +
          "Longitude: " + data[i].trigger.center[1] + "\n" +
          "Radius: " + data[i].trigger.radius + "\n" +
          "Notify on entry: " + data[i].trigger.notifyOnEntry + "\n");
        })
      
      }
    });
  }

}
