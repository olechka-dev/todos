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
  readonly savePath = "todos/create";
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
    catchError(this.handleError)              //why we don't pass param to handleError?
  );
}

saveTodo (todo: BaseTodo):Observable<Todo> {
// let todoId = new Date().getTime();
// let todoToSave = Object.assign({id:todoId, completed:false}, todo);
// localStorage.setItem(`${todoToSave.id}`, JSON.stringify(todoToSave)); //API http://localhost:3000/todos
// return of(todoToSave);  //this is crap, it should return of(server response indicating fail/success)

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
console.log(todo);
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
