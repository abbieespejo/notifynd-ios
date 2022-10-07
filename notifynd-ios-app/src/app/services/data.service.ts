import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  docData,
  getDoc,
} from '@angular/fire/firestore';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';


/**
 * A geolocational notification object.
 */
export interface notifObj {
  title: string;
  text: string;
  latitude: number;
  longitude: number;
  radius: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private firestore: Firestore, private localNotif: LocalNotifications) { }

  /**
   * Reads the notification documents in Firestore database.
   * @returns an Observable array of notification objects.
   */
  getNotifsInDB(): Observable<notifObj[]> {
    const notifRef = collection(this.firestore, 'notifications');
    return collectionData(notifRef) as Observable<notifObj[]>;
   
  }

  printDB() {
    let notifCollection = this.getNotifsInDB();
    notifCollection.subscribe(data => {
      for (let i = 0; i <= data.length; i++) {
        console.log("\DOCUMENT ID: " + i +"\n" +
          "Title: " + data[i].title + "\n" +
          "Text: " + data[i].text + "\n" + 
          "Latitude: " + data[i].latitude + "\n" +
          "Longitude: " + data[i].longitude + "\n" +
          "Radius: " + data[i].radius + "\n");
      }
    });
  }

  /**
   * Reads each notification doc in the Firestore database and 
   * schedules them as geolocational notifications.
   */
  prepareNotifications() {
    let notifCollection = this.getNotifsInDB(); // read Firestore db
    notifCollection.subscribe(docs => {
      // for as many notification documents there are in Firestore
      for (let i = 0; i <= docs.length; i++) {
        // use doc fields to schedule the geolocational notification
        this.localNotif.schedule({
          id: i,
          title: docs[i].title,
          text: docs[i].text,
          foreground: true,
          trigger: {
            type: 'location',
            center: [docs[i].latitude, docs[i].longitude],
            radius: docs[i].radius,
            notifyOnEntry: true
          }
        });
        console.log("\nThe following location-based notification was scheduled:" +
        "\nTitle: " + docs[i].title +
        "\nText: " + docs[i].text +
        "\nLatitude: " + docs[i].latitude +
        "\nLongitude: " + docs[i].longitude +
        "\nRadius: " + docs[i].radius +
        "\n--------------------------------------------------------------");
      }
    });
  }
}

