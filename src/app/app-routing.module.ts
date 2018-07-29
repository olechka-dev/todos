import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoStatisticsComponent } from './components/todo-statistics/todo-statistics.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TodoCompComponent },
  { path: 'stat', component: TodoStatisticsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
