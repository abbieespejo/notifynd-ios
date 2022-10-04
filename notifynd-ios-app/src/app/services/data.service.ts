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

  getAllNotifs() {
    const notifRef = collection(this.firestore, 'notifications');
    const allDocs = collectionData(notifRef) as Observable<notifObj[]>;
    allDocs.subscribe(result => {
      console.log(result);
      });
    }
  }

