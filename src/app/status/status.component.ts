import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status: string;
  color: string;

  constructor() {
  }

  ngOnInit() {
    this.color = this.statusToColor(this.status);
  }

  statusToColor(status: string) {
    switch (status) {
      case 'danger':
        return 'red';
      case 'safe':
        return 'green';
      case 'warning':
        return 'yellow';
      default:
        return 'green';
    }
  }
}
