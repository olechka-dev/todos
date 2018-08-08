import {reducer} from './todos/todo.reducer';

import {Todo} from '../todo';

export interface AppState {
    todos: Todo[];
}


export const reducers = {
    todos: reducer
};
