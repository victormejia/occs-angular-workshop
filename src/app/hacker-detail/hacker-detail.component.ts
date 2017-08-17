import { Component, OnInit, Input } from '@angular/core';
import { Hacker } from '../core/hacker.model';
import { ActivatedRoute } from '@angular/router';
import { HackerService } from '../core/services/hacker.service';

@Component({
  selector: 'app-hacker-detail',
  templateUrl: './hacker-detail.component.html',
  styleUrls: ['./hacker-detail.component.scss']
})
export class HackerDetailComponent implements OnInit {
  @Input() id: string;
  hacker: Hacker;

  constructor(private api: HackerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.renderDetails(this.id);
    });
  }

  renderDetails(id: string) {
    this.api.getHackerDetails(id)
      .subscribe((data) => {
        this.hacker = data;
      });
  }
}
