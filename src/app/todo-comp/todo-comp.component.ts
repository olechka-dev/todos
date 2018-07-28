import {Component, OnInit} from '@angular/core';
import {BaseTodo, Todo} from '../todo';
import {TodoService} from '../todo.service';
import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';


@Component({
    selector: 'app-todo-comp',
    templateUrl: './todo-comp.component.html',
    styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit {
    todoList: Observable<Todo[]>; //problem: if I use async pipe I don't have access to data returned by observable inside the class.
                                  //That's why I still have to save the data in the array in server. Any other way to do it?
    readonly filterOptions = ['ALL', 'ACTIVE', 'COMPLETED'];
    //currentFilter = 'ALL';

    constructor(private todoService: TodoService) {
    }
    //todoFilterList = this.todoList.pipe(tap());
    addTodo(newTodoVal: string): void {
        const _todo = {
                name: newTodoVal,
                completed: false
            };
        this.todoService.saveTodo(_todo)
                .subscribe(() => {
                  this.todoList = this.todoService.getTodoList();
                });
            }

    removeTodo(id: number): void {
      console.log("from parent: ", id);
        this.todoService.deleteTodo(id)
            .subscribe(() => {
              this.todoList = this.todoService.getTodoList()
            });
    }


    editTodo(todo): void {
        if (!!todo.name) {
            this.todoService.updateTodo(todo.id, todo)
                .subscribe(() => {
                  this.todoList = this.todoService.getTodoList()
                });
        } else {
            this.removeTodo(todo.id);
        }
    }


    completeToggle(todo): void {
        todo.completed = !todo.completed;
        this.todoService.updateTodo(todo.id, todo)
            .subscribe(() => {
              this.todoList = this.todoService.getTodoList()
            });
    }

    clearCompleted(): void {
        const ids = this.todoService.todos.filter(todo => todo.completed)
            .map(todo => todo.id);

        this.todoService.removeAllCompleted(ids)
            .subscribe(() => {
                this.todoList = this.todoService.getTodoList()
            });
    }


    private countByCompleted(completed: boolean): number {
        let counter = 0;
        this.todoService.todos.forEach((item) => {
            if (item.completed === completed) {
                counter++;
            }
        });
        return counter;
    }

    private findIndexById(id: number): number {
        let indexOfTodo = -1;
        this.todoService.todos.forEach((item, i) => {
            if (item.id === id) {
                indexOfTodo = i;
            }
        });
        return indexOfTodo;
    }

    get activeCount(): number {
        return this.countByCompleted(false);
    }

    get completedCount(): number {
        return this.countByCompleted(true);
    }

    filterList(filter:string): void {
      switch(filter) {
        case "ACTIVE":
          this.todoList = of(this.todoService.todos.filter(todo => todo.completed===false));
          break;
        case "COMPLETED":
          this.todoList = of(this.todoService.todos.filter(todo => todo.completed===true));
          break;
        default:
          this.todoList = of(this.todoService.todos);
      }
    }


    ngOnInit() {
          this.todoList = this.todoService.getTodoList();
    }

}
