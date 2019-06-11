import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

const Collection = 'userActivityCollection';

@Injectable({ providedIn: `root` })
export class UsersService {
  constructor(private db: AngularFirestore) {
  }

  getUsers(): Observable<User[]>{
    return this.db.collection<User>(Collection).valueChanges();
  }
}
