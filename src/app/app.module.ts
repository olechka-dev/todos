import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoCompComponent,
    SingleTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
