import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {GetTodosFailed, GetTodosSuccess, TodosActions, TodosActionTypes} from './todo.actions';
import {TodoService} from '../../todo.service';
import {AppState} from '../index';

@Injectable()
export class TodosEffects {
    curFilter;

    @Effect()
    loadList$: Observable<Action> = this.actions$.pipe(
        ofType<TodosActionTypes>(TodosActions.LOAD_TODOS),
        mergeMap((action) => {
                let filter;

                if (!action.payload) {
                    this.curFilter.subscribe(_filter => filter = _filter);
                    console.log('filter', filter);
                } else {
                    filter = action.payload.filter;
                }

                return this.todoService.getTodoList(filter)
                    .pipe(
                        map((resp) => new GetTodosSuccess(resp)),
                        catchError((error) => of(new GetTodosFailed(error)))
                    );
            }
        )
    );

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private todoService: TodoService) {

        this.curFilter = this.store.select('filter');

    }
}
