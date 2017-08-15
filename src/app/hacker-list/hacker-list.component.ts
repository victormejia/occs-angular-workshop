import { Component, OnInit } from '@angular/core';
import { Hacker } from '../core/hacker.model';

@Component({
  selector: 'app-hacker-list',
  templateUrl: './hacker-list.component.html',
  styleUrls: ['./hacker-list.component.scss']
})
export class HackerListComponent implements OnInit {

  hackers: Array<Hacker>;
  displayedList: Array<Hacker>;

  constructor() { }

  ngOnInit() {
    this.hackers = [
      {
        id: '0bf594d6-2d36-47de-af83-91c0c816a905',
        name: 'Ignacio',
        dob: '1956-12-07T15:30:00.333Z',
        address: '7269 Bradtke Coves',
        cityStateZip: 'West Cade, Tennessee 36631',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg',
        phone: '(367) 277-3869',
        statusMessage: 'We need to back up the digital SSL port!',
        specialty: 'calculating feed',
        ip: '173.68.118.11',
        email: 'Ignacio_Littel.Haag@gmail.com',
        password: 'kxHxzucqwmvV3y9',
        status: 'safe'
      },
      {
        id: '70dd6f38-fd14-4dfd-bd43-3b07586ce49e',
        name: 'Price',
        dob: '1960-06-01T11:01:12.720Z',
        address: '85066 Ona Shores',
        cityStateZip: 'Cartwrightview, South Carolina 24722',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg',
        phone: '(775) 232-7260',
        statusMessage: 'Use the optical RAM pixel, then you can navigate the online protocol!',
        specialty: 'bypassing pixel',
        ip: '187.154.44.205',
        email: 'Price.Donnelly9_Thompson37@gmail.com',
        password: 'ttRXuJjmsm9NLdG',
        status: 'warning'
      }
    ];

    this.displayedList = [...this.hackers];
  }

  filterData(term: string) {
    const searchTerm = term.toLowerCase();

    this.displayedList = this.hackers.filter((hacker) => {
      const { name, status } = hacker;
      return name.toLowerCase().includes(searchTerm) || status.toLowerCase().includes(searchTerm);
    });
  }

}
