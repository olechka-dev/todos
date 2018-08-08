import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodoCompComponent} from './todo-comp/todo-comp.component';
import {HttpClientModule} from '@angular/common/http';
import {SingleTodoComponent} from './components/single-todo/single-todo.component';
import {FormsModule} from '@angular/forms';
import {TodofooterComponent} from './components/todofooter/todofooter.component';
import {TodoInputComponent} from './components/todo-input/todo-input.component';
import {AppRoutingModule} from './app-routing.module';
import {TodoStatisticsComponent} from './todo-statistics/todo-statistics.component';
import {TodoFilterPipe} from './custom-pipes/filterPipe';
import {CountPipe} from './custom-pipes/countPipe';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/todos/todo.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {TodoStoreModule} from './store/module';


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
        AppRoutingModule,
        TodoStoreModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
