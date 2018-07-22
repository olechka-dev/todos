import {Component, OnInit} from '@angular/core';
import {BaseTodo, Todo} from '../todo';
import {TodoService} from '../todo.service';


@Component({
    selector: 'app-todo-comp',
    templateUrl: './todo-comp.component.html',
    styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit {
    todoList: Todo[];
    readonly filterOptions = ['ALL', 'ACTIVE', 'COMPLETED'];
    currentFilter = 'ALL';

    constructor(private todoService: TodoService) {
    }

    addTodo(newTodoVal: string): void {
        if (newTodoVal) {
            const _todo = {
                name: newTodoVal,
                completed: false
            };
            this.todoService.saveTodo(_todo)
                .subscribe((todo) => {
                    this.todoList.push(todo);
                });
        }
    }

    removeTodo(id: number): void {
        this.todoService.deleteTodo(id)
            .subscribe(_ => {
                this.todoList.splice(this.findIndexById(id), 1);
            });
    }


    editTodo(todo): void {
        if (!!todo.name) {
            this.todoService.updateTodo(todo.id, todo)
                .subscribe(() => {
                });
        } else {
            this.removeTodo(todo.id);
        }
    }


    completeToggle(todo): void {
        todo.completed = !todo.completed;
        this.todoService.updateTodo(todo.id, todo)
            .subscribe((_id) => {
            });
    }

    clearCompleted(): void {
        const ids = this.todoList
            .filter(todo => todo.completed)
            .map(todo => todo.id);

        this.todoService.removeAllCompleted(ids)
            .subscribe((todos) => {
                this.todoList = todos;
            });
    }


    private countByCompleted(completed: boolean): number {
        let counter = 0;
        this.todoList.forEach((item) => {
            if (item.completed === completed) {
                counter++;
            }
        });
        return counter;
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

    get activeCount(): number {
        return this.countByCompleted(false);
    }

    get completedCount(): number {
        return this.countByCompleted(true);
    }

    ngOnInit() {
        this.todoService.getTodoList()
            .subscribe((todoFromStorage) => {
                this.todoList = todoFromStorage;
            });
    }

}
