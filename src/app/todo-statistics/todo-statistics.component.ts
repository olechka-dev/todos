import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-statistics',
  templateUrl: './todo-statistics.component.html',
  styleUrls: ['./todo-statistics.component.css']
})
export class TodoStatisticsComponent implements OnInit {
  
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

}
