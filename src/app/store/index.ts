import {reducer, TodoState} from './todos/todo.reducer';
import {reducerFilter} from './filter/reducer';

import {Todo} from '../todo';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AppState {
    todoState: TodoState;
    filter: string;
}


export const reducers = {
    todoState: reducer,
    filter: reducerFilter
};

export const todoStateSelector = createFeatureSelector<TodoState>('todoState');

export const todosListSelector = createSelector(todoStateSelector, (state) => state.todos);

export const metadataSelector = createSelector(todoStateSelector, (state) => state.metadata);
