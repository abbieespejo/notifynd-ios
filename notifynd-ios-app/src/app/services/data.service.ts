import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  docData,
  getDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

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

  constructor(private firestore: Firestore) { }

    getNotifsInDB(): Observable<notifObj[]> {
    const notifRef = collection(this.firestore, 'notifications');
    return collectionData(notifRef) as Observable<notifObj[]>;
  }

  // loadNotifications() {
  //   const notifRef = collection(this.firestore, 'notifications');
  //   const notifCollection = collectionData(notifRef) as Observable<notifObj[]>;
    // notifCollection.subscribe(docs => {
    //   for (let i = 0; i <= docs.length; i++) {
    //     this.localNotif.schedule({
    //       id: i,
    //       title: docs[i].title,
    //       text: docs[i].text,
    //       trigger: {
    //         center: [docs[i].latitude, docs[i].longitude],
    //         radius: docs[i].radius,
    //         notifyOnEntry: true
    //       }
    //     });
    //   }
    // });
    // this.localNotif.getAllScheduled().then(result => {
    //   console.log("THESE ARE THE SCHEDULE NOTIFS" + result);
    // })
  // }
}

