import {reducer} from './todos/todo.reducer';
import {reducerFilter} from './filter/reducer'

import {Todo} from '../todo';

export interface AppState {
    todos: Todo[];
    filter: string
}


export const reducers = {
    todos: reducer,
    filter: reducerFilter
};
