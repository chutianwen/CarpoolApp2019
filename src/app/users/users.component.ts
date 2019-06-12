import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../users.service';
import {FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('focusPanel', [
      state('inactive', style({
        // transform: 'scale(1)',transform: 'translateY(0%)',
        backgroundColor: '#eee'
      })),
      state('active', style({
        // transform: 'scale(1.1)',transform:'translateY(-80%)',
        bottom: 0,
        backgroundColor: '#f6f6f6'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ]),
  ]
})
export class UsersComponent implements OnInit {
  searchText: string;

  userName: string;
  arrival: string;
  departure: string;
  role: string;
  address: string;
  phone: string;
  price: number;
  memo: string;

  searchControl: FormControl;
  // defining animation state
  state: string = 'inactive';

  users: User[];
  @ViewChild('placesRef', {static: true}) placesRef: GooglePlaceDirective;

  public handleAddressChange(address: Address) {
    this.address = address.name;
  }

  constructor(private userService: UsersService) { }
  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.searchControl = new FormControl();
  }

  submitUser(){
    alert(this.address);
    if(this.address){
      console.log(`Submit address: ${this.address}`);
      const userNew = {
        userName: this.userName,
        arrival: this.arrival,
        departure: this.departure,
        role: this.role,
        address: this.address,
        phone: this.phone,
        price: this.price,
        memo: this.memo
      };
      this.userService.submitUser(userNew);
    }
    this.address = '';
  }

  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }
}
