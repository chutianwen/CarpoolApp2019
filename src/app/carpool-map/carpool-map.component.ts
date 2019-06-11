import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {UserWithLoc} from '../userwithloc';
import {User} from '../user';
import {GeocodeService} from '../geocode.service';
import {Observable} from 'rxjs/index';

const userExample: User = {
  userName: "Amy",
  address: "Fairfax Blvd, Fairfax, VA",
}

const addressExample = "Germantown Rd, Germantown, MD";
@Component({
  selector: 'app-carpool-map',
  templateUrl: './carpool-map.component.html',
  styleUrls: ['./carpool-map.component.css']
})
export class CarpoolMapComponent implements OnInit {

  usersWithLoc: UserWithLoc[];
  constructor(private userService: UsersService,
               private geoCodeService: GeocodeService) { }

  ngOnInit() {
    this.geoCodeService.geocodeAddress(addressExample).subscribe(loc => console.log(addressExample + ' ' + loc.lat));
    this.geoCodeService.geocodeUser(userExample).subscribe(loc => console.log(userExample.address + ' ' + loc.loc.lng));
    this.usersWithLoc = [];
    this.userService.getUsers().subscribe((users: User[]) => {
      this.addLocToUsers(users).map((userWithLoc) => {
        userWithLoc.subscribe(item => this.usersWithLoc.push(item));
      });
    });
  }

  addLocToUsers(users: User[]): Observable<UserWithLoc>[] {
    return users.map(user => this.geoCodeService.geocodeUser(user));
  }

}
