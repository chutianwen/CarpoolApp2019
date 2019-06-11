import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../user';

@Pipe({
  name: 'usernamefilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], query: string): any[] {
    if (!query) { return users; }
    return users.filter(function(x) {
      return x.userName.toLowerCase().includes(query.toLowerCase());
    });
  }
}
