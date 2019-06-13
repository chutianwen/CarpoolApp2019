import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {UserWithLoc} from '../userwithloc';
import {User} from '../user';
import {GeocodeService} from '../geocode.service';
import {Observable} from 'rxjs/index';

// const userExample: User = {
//   userName: "Amy",
//   address: "Fairfax Blvd, Fairfax, VA",
// }

const addressExample = 'Germantown Rd, Germantown, MD';

@Component({
  selector: 'app-carpool-map',
  templateUrl: './carpool-map.component.html',
  styleUrls: ['./carpool-map.component.css']
})
export class CarpoolMapComponent implements OnInit {

  usersWithLoc: UserWithLoc[] = [];
  showAddress: Boolean = true;
  addressSwitchName: String = 'hide address';

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((usersWithLoc: UserWithLoc[]) => {
      console.log(`Total usersWithLoc: ${usersWithLoc.length}`);
      this.usersWithLoc = usersWithLoc;
      });
  }

  addressSwitch() {
    // if true, means user hit 'hide'
    if (this.showAddress){
      this.showAddress = false;
      this.addressSwitchName = 'show address';
    } else{
      this.showAddress = true;
      this.addressSwitchName = 'hide address';
    }
  }
}
