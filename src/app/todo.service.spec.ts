/// <reference path="./matchers/myType.matcher.d.ts"/>

import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { BaseTodo, Todo} from './todo';
import { TodoService } from './todo.service';

import {customMatchers} from "./matchers/myType.matcher";
import {assertNumber} from "../../node_modules/@angular/core/src/render3/assert";


describe('TodoService', () => {
    let injector: TestBed;
    let service: TodoService;
    let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
        imports: [HttpClientTestingModule]
    });

      injector = getTestBed();
      service = injector.get(TodoService);
      httpMock = injector.get(HttpTestingController);

      jasmine.addMatchers(customMatchers);
  });

    afterEach(() => {
        httpMock.verify();
    });


    //4 following examples are positive tests, using
  it('should be created', () => {//inject([TodoService], (service: TodoService) => {
      expect(service).toBeTruthy();
      //}));
  });

  it('should get todos from server', //inject([TodoService, HttpTestingController],
     // (service: TodoService, httpMock: HttpTestingController) => {
      () => {
          service.getTodoList().subscribe(data => {
              expect(Object.keys(data)).toEqual(["todos", "metadata"])
          });
          const req = httpMock.expectOne(service.baseUrl);
          expect(req.request.method).toEqual('GET');
          // Then we set the fake data to be returned by the mock
          req.flush({
              "results": [],
              "metadata": {}
          });


          // })
      });
  it('should save new todo', //inject([TodoService, HttpTestingController],
      //(service: TodoService, httpMock: HttpTestingController) => {
      () => {
          let baseTodo = {
              name: "test",
              completed: false
          };
          service.saveTodo(baseTodo).subscribe(data => {
              expect(data).toBeInstanceOfTodo();//!! Doesn't work
              expect(data.name).toEqual("test");
              expect(data.completed).toEqual(false);
          });

          const req = httpMock.expectOne(service.baseUrl);
          expect(req.request.method).toEqual('POST');
          req.flush({
              name: "test",
              completed: false,
              id: 1
          });

      });
  //  }));

  it('should delete todo', () => {
      let id = 1;
      service.deleteTodo(id).subscribe(data => {
          expect(Object.keys(data)).toEqual([]);
      });
      const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
      expect(req.request.method).toEqual("DELETE");
      req.flush({});
  });

  //negative testing, example below

  it('should fail updating todo if id is empty', () => {
      let id = null;
      let partialTodo = {name: "test blabla"};
      service.updateTodo(id, partialTodo).subscribe(() => {},err => {
          expect(err).toEqual("Something bad happened; please try again later.")
      });
      const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
      expect(req.request.method).toEqual("PATCH");
      req.flush({}, {headers:{}, status: 404, statusText: "Not Found"} );
  });


});
