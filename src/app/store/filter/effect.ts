import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {GetTodos} from '../todos/todo.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {FiltersActions, UPDATE_FILTER} from './actions';
import {AppState} from '../index';

@Injectable()
export class FilterEffects {

    @Effect({dispatch: false})
    changeFilter$ = this.actions$.pipe(
        ofType<FiltersActions>(UPDATE_FILTER),
        map((action) => {
                console.log('action', action);
                this.store.dispatch(new GetTodos(action));
            }
        )
    );

    constructor(private actions$: Actions,
                private store: Store<AppState>) {
    }
}
