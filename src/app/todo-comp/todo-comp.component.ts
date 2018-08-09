import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store';
import * as FilterActions from '../store/filter/actions';
import {GetTodos} from '../store/todos/todo.actions';


@Component({
    selector: 'app-todo-comp',
    templateUrl: './todo-comp.component.html',
    styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit {
    todoList;
    curFilter;

    constructor(private todoService: TodoService,
                private store: Store<AppState>) {

        this.store.dispatch(new GetTodos());

        this.curFilter = this.store.select('filter');
        this.todoList = this.store.select('todos');


    }


    updateCurFilter(filter) {
        this.store.dispatch(new FilterActions.UpdateFilter(filter));
    }

    addTodo(newTodoVal: string): void {
        const _todo = {
            name: newTodoVal,
            completed: false
        };
        // this.todoService.saveTodo(_todo)
        //     .subscribe(() => {
        //         this.todoService.getTodoList();
        //     });
    }

    removeTodo(id: number): void {
        console.log('from parent: ', id);
        // this.todoService.deleteTodo(id)
        //     .subscribe(() => {
        //         this.todoService.getTodoList();
        //     });
    }


    editTodo(todo): void {
        if (!!todo.name) {
            this.todoService.updateTodo(todo.id, todo)
                .subscribe(() => {
                    this.todoService.getTodoList();
                });
        } else {
            this.removeTodo(todo.id);
        }
    }


    completeToggle(todo): void {
        todo.completed = !todo.completed;
        this.todoService.updateTodo(todo.id, todo)
            .subscribe(() => {
                this.todoService.getTodoList();
            });
    }

    clearCompleted(todos: Todo[]): void {
        const ids = todos.filter(todo => todo.completed)
            .map(todo => todo.id);

        this.todoService.removeAllCompleted(ids)
            .subscribe(() => {
                this.todoService.getTodoList();
            });
    }

    ngOnInit() {
        this.todoService.getTodoList();
    }

}
