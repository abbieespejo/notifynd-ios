import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

//  Firebase modules
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

// Environment
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
