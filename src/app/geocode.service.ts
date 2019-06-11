import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Location } from './location-model';
import {User} from 'user';
import {UserWithLoc} from './userwithloc';

declare var google: any;

@Injectable({ providedIn: `root` })
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

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

  geocodeUser(user: User): Observable<UserWithLoc> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': user.address}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next({
                user: user,
                loc: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                }
              });
            } else if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
              console.log("over_query_limit" + ' ' + user.address);
              setTimeout("wait = true", 10);
              return this.geocodeUser(user);
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({
                user: user,
                loc: {
                  lat: 0,
                  lng: 0
                }
              });
            }
            observer.complete();
          });
        });
      })
    );
  }

  geocodeAddress(address: String): Observable<Location> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
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

}
