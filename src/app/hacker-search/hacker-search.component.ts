import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hacker-search',
  templateUrl: './hacker-search.component.html',
  styleUrls: ['./hacker-search.component.scss']
})
export class HackerSearchComponent implements OnInit {

  @Output() newSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.newSearch.emit(event.target.value);
  }

}
