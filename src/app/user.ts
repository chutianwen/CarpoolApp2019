import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase';

export class User {
  userName: string;
  arrival: Timestamp;
  departure: Timestamp;
  role: string;
  address: string;
  phone: string;
  price: number;
  memo: string;
}
