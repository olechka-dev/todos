import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import {FormsModule} from '@angular/forms';
import { TodofooterComponent } from './components/todofooter/todofooter.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { AppRoutingModule } from './/app-routing.module';
import { TodoStatisticsComponent } from './components/todo-statistics/todo-statistics.component';
import { TodoFilterPipe } from './custom-pipes/filterPipe';
import { CountPipe } from './custom-pipes/countPipe'

@NgModule({
  declarations: [
    AppComponent,
    TodoCompComponent,
    SingleTodoComponent,
    TodofooterComponent,
    TodoInputComponent,
    TodoStatisticsComponent,
    TodoFilterPipe,
    CountPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      FormsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
