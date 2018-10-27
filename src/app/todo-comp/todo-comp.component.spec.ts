import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { TodoCompComponent } from './todo-comp.component';
import {TodoService} from "../todo.service";
import {Store} from "@ngrx/store";
import {AppState} from "../store";
// import {TodoState} from "../store/todos/todo.reducer";
// import { BehaviorSubject, Observable } from 'rxjs';
import {TodoInputComponent} from "../components/todo-input/todo-input.component";
import {SingleTodoComponent} from "../components/single-todo/single-todo.component";
import {TodofooterComponent} from "../components/todofooter/todofooter.component";

import {of} from 'rxjs/internal/observable/of';
import {TodoStoreModule} from "../store/module";
import {HttpClientModule} from "../../../node_modules/@angular/common/http";
import * as TodoActions from '../store/todos/todo.actions';
import {Todo} from "../todo";


let mockTodoList = {
    todos: [{id:1, name:"todo - 1", completed: false}, {id:2, name:"todo - 2", completed: true}],
    metadata: {
        active: 1,
        completed: 1,
        all: 2
    }
};

let mockTodo = {id:3, name:"todo - 3", completed: false};

fdescribe('TodoCompComponent', () => {
  let component: TodoCompComponent;
  let fixture: ComponentFixture<TodoCompComponent>;
  let service: TodoService;
    let store: Store<any>;


  beforeEach(async( () => {

      const todoService = jasmine.createSpyObj('TodoService', ['getTodoList', 'saveTodo']);
      let getTodoSpy = todoService.getTodoList.and.returnValue(of(mockTodoList));
      let saveTodoSpy = todoService.saveTodo.and.callFake(() => {
          mockTodoList.todos.push(mockTodo);
          return of(mockTodo);
      });

      TestBed.configureTestingModule({
      declarations: [ TodoCompComponent, TodoInputComponent, SingleTodoComponent, TodofooterComponent ],
        providers:[
            TodoCompComponent,
            { provide: TodoService, useValue:todoService } ],
        imports:[FormsModule, TodoStoreModule, HttpClientModule]
    }).compileComponents()
          .then(() => {

        fixture = TestBed.createComponent(TodoCompComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store = fixture.debugElement.injector.get(Store);
        service = fixture.debugElement.injector.get(TodoService);


    });

  }));


    it(`should create`, () => {
        expect(component).toBeTruthy();
        }
    );


  it('should get current filter from store', () => {
      component.curFilter.subscribe(data => { expect(data).toEqual("ALL")} );
  });

    it('should get metadata and todoList from store', () => {
        store.dispatch(new TodoActions.GetTodosSuccess(mockTodoList));
        console.log("metadata", component.metadata);
        expect(component.metadata.all).toEqual(2);
        component.todoList.subscribe(data => {expect(data).toEqual(mockTodoList.todos)});
    });

    it('should update current filter', () => {
        component.updateCurFilter("ACTIVE");
        component.curFilter.subscribe(data => {
            console.log('KAKA', data)
            expect(data).toEqual("ACTIVE")
        } );
        console.log('KAKA')
    })


    it('should add new todo', () => {
        component.addTodo(mockTodo.name);
        component.todoList.subscribe(data => { console.log("data... ", data);
            expect(data.includes(mockTodo)).toBeTruthy();
        });
    });

    it('should show Todos title', () => {
        let h1 = fixture.nativeElement.querySelector('h1');
        expect(h1.textContent).toEqual("TODOS");
    })


});














