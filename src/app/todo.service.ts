import { Injectable } from '@angular/core';
import { BaseTodo, Todo } from './todo';
import { of } from 'rxjs/internal/observable/of';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders ({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = "http://localhost:3000/";
  readonly savePath = "todos/create";  // paths are defined inside the class. WHat's the right way to do it?
  readonly getPath = "todos/all";
  readonly updatePath = "todos/update";
  readonly deletePath = "todos/delete";
  readonly deleteCompletedPath = "todos/deleteCompleted"

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

getTodoList(): Observable <Todo[]> {
  let todoList = [];
  return this.http.get<Todo[]>(this.baseUrl+this.getPath).pipe(
    catchError(this.handleError)              //I copy/pasted handleError method :( and don't understand - why we call it without parameter?
  );
}

saveTodo (todo: BaseTodo):Observable<Todo> {
  return this.http.post<Todo>(this.baseUrl+this.savePath, todo, httpOptions).pipe(
  catchError(this.handleError)
);
}

deleteTodo(id:number):Observable<{}> {
  let todo = {id: id};
  let deleteOptions = Object.assign({body: todo}, httpOptions);
  return this.http.delete<{}>(this.baseUrl+this.deletePath, deleteOptions).pipe(
    catchError(this.handleError)
  );
};

updateTodo(id:number, newName?:string, newCompleted?:boolean):Observable<number> {
  let todo = {id: id};
  if(newName) {
    Object.defineProperty(todo, "name", {value:newName, configurable: true, writable: true, enumerable: true});
  }
  if(newCompleted!==undefined) {
    Object.defineProperty(todo, "completed", {value:newCompleted, configurable: true, writable: true, enumerable: true});
  }

  return this.http.put<{id: number}>(this.baseUrl+this.updatePath, todo, httpOptions).pipe(
    map(data => {return data.id}),
    catchError(this.handleError)
  );
}

removeAllCompleted(): Observable <Todo[]> {
  return this.http.delete<Todo[]>(this.baseUrl+this.deleteCompletedPath, httpOptions).pipe(
    catchError(this.handleError)
  );
}

}
