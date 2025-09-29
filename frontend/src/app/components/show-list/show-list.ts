import { ShowService, Show } from './../../services/show';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-list',
  imports: [CommonModule],
  templateUrl: './show-list.html',
  styleUrl: './show-list.css',
})
export class ShowList implements OnInit {
  shows: Show[] = [];

  constructor(public showService: ShowService) {}

  async ngOnInit() {
    // Call the service and assign result to shows
    this.shows = await this.showService.getShows();
  }
}
