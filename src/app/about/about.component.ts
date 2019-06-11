import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// import { EventEmitter } from 'events';
import {trigger, state, style, transition,animate} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('focusPanel', [
      state('inactive', style({
        // transform: 'scale(1)',
        transform: 'translateY(80%)',
        backgroundColor: 'blue',
      })),
      state('active', style({
        // transform: 'scale(1.1)',
        transform: 'translateY(0)',
        backgroundColor: 'red'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ]),

  ]
})
export class AboutComponent implements OnInit {
  @Input() aPerson;
  @Output() smacked= new EventEmitter();

  title: string = 'About Us';
  state: string = 'inactive';

  constructor() { }

  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }

  ngOnInit() {
  }

}
