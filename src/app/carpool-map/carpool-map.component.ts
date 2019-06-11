import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {geocode} from 'google-geocoder/index.js'
import {UserWithLoc} from '../userwithloc';
import {User} from '../user';

@Component({
  selector: 'app-carpool-map',
  templateUrl: './carpool-map.component.html',
  styleUrls: ['./carpool-map.component.css']
})
export class CarpoolMapComponent implements OnInit {
  google_geocoding = geocode;

  usersWithLoc: UserWithLoc[];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.usersWithLoc = users);
  }

  addLocToUsers(users: User[]): UserWithLoc[] {
    return users.map(user => )
  }
}
