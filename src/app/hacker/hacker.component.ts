import { Component, OnInit, Input } from '@angular/core';
import { Hacker } from '../core/hacker.model';

@Component({
  selector: '[app-hacker]', // tslint:disable-line
  templateUrl: './hacker.component.html',
  styleUrls: ['./hacker.component.scss']
})
export class HackerComponent implements OnInit {

  @Input() hacker: Hacker;

  constructor() { }

  ngOnInit() {
  }

}
