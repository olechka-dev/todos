import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todofooter',
  templateUrl: './todofooter.component.html',
  styleUrls: ['./todofooter.component.scss']
})
export class TodofooterComponent implements OnInit {

  @Input() metadata;
  @Input() filterOptions;
  @Input() curFilter;


  @Output('onDeleteCompleted') onDeleteCompleted = new EventEmitter();
  @Output('onFilterSelected') onFilterSelected = new EventEmitter();
  constructor() {
  }

  deleteCompleted() {
    this.onDeleteCompleted.emit();
  }

  setFilter(filter:string) {
    this.onFilterSelected.emit(filter);
  }

  ngOnInit() {
  }

}
