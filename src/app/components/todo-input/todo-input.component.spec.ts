import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputComponent } from './todo-input.component';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the name', () => {

        let name = "test";
        component.onAdd.subscribe(expName => {expect(expName).toEqual(name)});
        component.addNewTodo(name);
    });

  it('should not emit the name', () => {

      spyOn(component, "onAdd");
        let name = "";
        expect(component.onAdd).not.toHaveBeenCalled();
        component.addNewTodo(name);
    });
});
