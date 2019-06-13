import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {GeocodeService} from './geocode.service';
import {UserWithLoc} from './userwithloc';

// userActivityCollection
const Collection = 'carpool';

@Injectable({ providedIn: `root` })
export class UsersService {

  userCollection: AngularFirestoreCollection<UserWithLoc>;

  constructor(private db: AngularFirestore, private geocodeService: GeocodeService) {
    this.userCollection = db.collection(Collection);
  }

  getUsers(): Observable<UserWithLoc[]>{
    return this.userCollection.valueChanges();
  }

  submitUser(user: User) {
    this.geocodeService.geocodeUser(user).subscribe( (userWithLoc) => {
      console.log(`${userWithLoc.userName}; ${userWithLoc.address}; ${userWithLoc.lat}; ${userWithLoc.lng};
      ${userWithLoc.price};${userWithLoc.phone};${userWithLoc.role};${userWithLoc.memo}; ${userWithLoc.arrival}; ${userWithLoc.departure}`);
      this.userCollection.doc(user.userName).set(userWithLoc)
        .then(() => alert('Submit successfully'))
        .catch( err => console.log(`Submit has error ${err}`));
    });

  }
}
