import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

const Collection = 'userActivityCollection';

@Injectable({ providedIn: `root` })
export class UsersService {

  userCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.userCollection = db.collection(Collection);
  }

  getUsers(): Observable<User[]>{
    return this.userCollection.valueChanges();
  }

  submitUser(user: User) {
    this.userCollection.doc(user.userName).set(user)
      .then(() => alert('Submit successfully'))
      .catch( err => console.log(`Submit has error ${err}`));
  }
}
