import {NgModule} from '@angular/core';
import {reducer} from './todos/todo.reducer';
import {StoreModule} from '@ngrx/store';

@NgModule({
    imports: [
        StoreModule.forRoot({
            todos: reducer
        }),
    ]
})
export class TodoStoreModule {
}
