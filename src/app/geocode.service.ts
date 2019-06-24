import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {map, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Location} from './location-model';
import {User} from './user';
import {UserWithLoc} from './userwithloc';
import {Subscriber} from 'rxjs/index';
import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase';

declare var google: any;

@Injectable({providedIn: `root`})
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {
  }

  geocodeUser(user: User): Observable<UserWithLoc> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable<UserWithLoc>(observer => this.helper(user, observer));
      })
    );
  }


  
  zipLocToUser(user: User, lat: number, lng: number) {
    const userWithLoc: UserWithLoc = {
      userName: user.userName,
      arrival: user.arrival,
      departure: user.departure,
      role: user.role,
      address: user.address,
      phone: user.phone,
      price: user.price,
      memo: user.memo,
      lat: lat,
      lng: lng
    };
    return userWithLoc;
  }
  helper(user: User, observer: Subscriber<UserWithLoc>) {
    this.geocoder.geocode({'address': user.address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(`Geocoding complete: ${user.address}, ${results[0].geometry.location.lat()}`);
        observer.next(this.zipLocToUser(user,
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()));
      } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        console.log(`over_query_limit: ${user.address}`);
        setTimeout(() => this.helper(user, observer), 2000);
      } else {
        console.log('Error - ', results, ' & Status - ', status);
        observer.next(this.zipLocToUser(user, 0, 0));
      }
      // Need to figure out the reasoning behind. If turn it on, then usersWithLoc will have problem
      observer.complete();
    });
  }

  geocodeAddress(address: String): Observable<Location> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable<Location>(observer => {
          this.geocoder.geocode({'address': address}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next(
                {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next(
                {
                  lat: 0,
                  lng: 0
                });
            }
            observer.complete();
          });
        });
      })
    );
  }

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }


}
