import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoStatisticsComponent } from './todo-statistics/todo-statistics.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import {TodoInputComponent} from "./components/todo-input/todo-input.component";
import {AppModule} from "./app.module";

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TodoCompComponent },
  { path: 'stat', component: TodoStatisticsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
