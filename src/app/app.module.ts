import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarpoolMapComponent } from './carpool-map/carpool-map.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UsersComponent } from './users/users.component';
import {environment} from '../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFilterPipe} from './users/user.filter.pipe';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

// import { AgmCoreModule } from '@agm/core';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    CarpoolMapComponent,
    UsersComponent,
    UserFilterPipe,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ClarityModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcm5AnNDQq_IOMjSJ3bnw-96Y3TSYFKDE',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule
    // AngularFirestoreModule.enablePersistence(),
    // AngularFirestoreModule,
  ],
  providers: [AngularFirestore, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
