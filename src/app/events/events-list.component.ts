import { Component, Inject, OnInit } from '@angular/core'
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared'

@Component({
  template: `
  <div class="container">
    <h1>Upcoming Angular Events</h1>
    <hr/>
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
      </div>
    </div>
  </div>
  `
})
export class EventsListComponent implements OnInit {
  events: IEvent[] = []

  constructor(@Inject(TOASTR_TOKEN) private toastr: Toastr, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }

  handleThumbnailClick(eventName: any) {
    this.toastr.success(eventName)
  }
}