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
    todoList: Observable<Todo[]>;
    // readonly filterOptions = ['ALL', 'ACTIVE', 'COMPLETED'];
    // currentFilter = 'ALL';

    constructor(private todoService: TodoService) {
    }

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

    clearCompleted(todos:Todo[]): void {
        const ids = todos.filter(todo => todo.completed)
            .map(todo => todo.id);

        this.todoService.removeAllCompleted(ids)
            .subscribe(() => {
                this.todoList = this.todoService.getTodoList()
            });
    }

    ngOnInit() {
          this.todoList = this.todoService.getTodoList();
    }

}
