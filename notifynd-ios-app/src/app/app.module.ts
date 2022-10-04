import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())],
  providers: [ Diagnostic, LocalNotifications, Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
