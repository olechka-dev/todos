import {Todo} from '../../todo';

import {TodosActionTypes, TodosActions} from './todo.actions';

export function reducer(state: Todo[] = [], action: TodosActionTypes) {

    switch (action.type) {
        case TodosActions.LOAD_TODOS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
