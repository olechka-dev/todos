import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todofooter',
  templateUrl: './todofooter.component.html',
  styleUrls: ['./todofooter.component.css']
})
export class TodofooterComponent implements OnInit {

  @Input() activeCount;
  @Input() filterOptions;
  @Input() completedCount;

  @Output('onDeleteCompleted') onDeleteCompleted = new EventEmitter();
  @Output('onFilterSelected') onFilterSelected = new EventEmitter();
  constructor() { }

  deleteCompleted() {
    this.onDeleteCompleted.emit();
  }

  setFilter(filter:string) {
    this.onFilterSelected.emit(filter);
  }

  ngOnInit() {
  }

}
