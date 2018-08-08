import {Injectable} from '@angular/core';
import {BaseTodo, Todo} from './todo';
import {of} from 'rxjs/internal/observable/of';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import * as TodoActions from './store/todos/todo.actions';

import {BehaviorSubject} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class TodoService {


    constructor(private http: HttpClient,
                private store: Store<AppState>) {
    }

    readonly baseUrl = 'http://localhost:3000/todos';
    readonly deleteCompletedPath = 'todos/deleteCompleted';
    readonly filterOptions = ['ALL', 'ACTIVE', 'COMPLETED'];
    currentFilter = 'ALL';

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    };

    getTodoList(): void {
        this.http.get<Todo[]>(this.baseUrl)
            .pipe(catchError(this.handleError)).subscribe(todos => {
            console.log('2');
            this.store.dispatch(new TodoActions.GetTodos(todos));
        });
    }

    saveTodo(todo: BaseTodo): Observable<Todo> {
        return this.http.post<Todo>(this.baseUrl, todo, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteTodo(id: number): Observable<{}> {
        let todo = {id: id};
        return this.http.delete<{}>(`${this.baseUrl}/${id}`, httpOptions).pipe(
            catchError(this.handleError)
        );
    };

    updateTodo(id: number, partialTodo): Observable<number> {
        return this.http.patch<{ id: number }>(`${this.baseUrl}/${id}`, partialTodo, httpOptions).pipe(
            map(data => {
                return data.id;
            }),
            catchError(this.handleError)
        );
    }

    removeAllCompleted(ids: number[]): Observable<Todo[]> {
        return this.http.post<Todo[]>(this.baseUrl + '/delete-many', {ids}, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

}
