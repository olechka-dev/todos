import { Component, OnInit } from '@angular/core';
import { BaseTodo, Todo } from '../todo'
import { TodoService } from '../todo.service'


@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit {
  todoList: Todo[];
  readonly filterOptions = ["ALL", "ACTIVE", "COMPLETED"];
  currentFilter = "ALL";
  //subscrEdit:any;


  constructor(private todoService: TodoService) { }

  addTodo(newTodoVal: string): void {
    if(newTodoVal) {
      const _todo = { name: newTodoVal };
      this.todoService.saveTodo(_todo)
      .subscribe( (todo) => {
          this.todoList.push(todo)
      });
    }
  }

  removeTodo(id: number): void {
    this.todoService.deleteTodo(id)
    .subscribe( _ => {
        this.todoList.splice(this.findIndexById(id), 1)});
    }

  openInputForEdit(event: any): void {
    let divToHide = event.currentTarget.parentElement;
    let inputToShow = divToHide.closest("li").querySelector("input.hide");
    divToHide.classList.add("hide");
    inputToShow.classList.add("edit");
    inputToShow.focus();

}
  editTodo(event: any, id: number, newName: string): void {
    // if(this.subscrEdit) {
    //   this.subscrEdit.unsubscribe();
    // }
    let curTarget = event.currentTarget;
    if (newName == "") {
      this.removeTodo(id);
    } else {
    //  this.subscrEdit =
      this.todoService.updateTodo(id, newName)
      .subscribe((_id) => {
        this.todoList[this.findIndexById(_id)].name = newName;
        curTarget.classList.remove("edit");
        curTarget.closest("li").querySelector("div.hide").classList.remove("hide");
      })
    }
}


completeToggle(id: number, isChecked: boolean):void {
  this.todoService.updateTodo(id, "", isChecked)
  .subscribe((_id) => {
    this.todoList[this.findIndexById(_id)].completed = isChecked;

  })
}


matchFilter(todo: Todo):boolean {
  if(this.currentFilter === "ALL" ||
  (this.currentFilter === "COMPLETED" && todo.completed === true) ||
  (this.currentFilter === "ACTIVE" && todo.completed === false)) {
    return true;
  }
  return false;
}

clearCompleted():void {
  this.todoService.removeAllCompleted()
  .subscribe((todos) => {this.todoList = todos});
}


 private countByCompleted(completed:boolean):number {
   let counter=0;
   this.todoList.forEach((item) => {
     if(item.completed ===completed) {
       counter++;
     }
   })
  return counter;
  }

  private getIndexInList(curElem: any): number {                     //DO NOT USE, unbelievable function for getting index of child element in parent's children array
    return [].indexOf.call(curElem.parentElement.children, curElem);
  }

  private findIndexById(id: number): number {
    let indexOfTodo = -1;
    this.todoList.forEach((item, i) => {
      if (item.id === id) {
        indexOfTodo = i;
      }
    });
    return indexOfTodo;
  }

  get activeCount():number {
    return this.countByCompleted(false);
  }
  get completedCount():number {
    return this.countByCompleted(true);
  }

  ngOnInit() {
    this.todoService.getTodoList()
    .subscribe((todoFromStorage) => {this.todoList = todoFromStorage});
  }

}
