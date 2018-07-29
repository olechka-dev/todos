import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-statistics',
  templateUrl: './todo-statistics.component.html',
  styleUrls: ['./todo-statistics.component.css']
})
export class TodoStatisticsComponent implements OnInit {
filterOptions = ["ACTIVE", "COMPLETED", "ALL"];
  constructor() { }

  ngOnInit() {
  }

}
