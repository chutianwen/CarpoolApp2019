import { Pipe, PipeTransform } from '@angular/core';
import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase';

@Pipe({
  name: 'datefilter'
})
export class DateFilterPipe implements PipeTransform {
  transform(timeStamp: Timestamp): String {
    return timeStamp.toDate().toUTCString();
  }
}
