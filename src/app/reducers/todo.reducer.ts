import { Action } from '@ngrx/store'
import { Todo } from '../todo'
import * as TodoActions from '../actions/todo.actions'

export function reducer(state: Todo[] = [], action: TodoActions.Actions) {

    switch(action.type) {
        case TodoActions.GET_TODOS:
            return action.todos;
        default:
            return state;
    }
}
