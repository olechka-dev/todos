import {Action} from '@ngrx/store';
import {Todo} from '../../todo';

export const GET_TODOS = '[TODO] Get';

export enum TodosActions {
    LOAD_TODOS = '[TODO] Load',
    LOAD_TODOS_SUCCESS = '[TODO] Load Success',
    LOAD_TODOS_FAILED = '[TODO] Load Failed',
}

export class GetTodos implements Action {
    readonly type = TodosActions.LOAD_TODOS;

    constructor(public payload?: { filter: string }) {
    }
}

export class GetTodosSuccess implements Action {
    readonly type = TodosActions.LOAD_TODOS_SUCCESS;

    constructor(public payload: Todo[]) {
    }
}

export class GetTodosFailed implements Action {
    readonly type = TodosActions.LOAD_TODOS_FAILED;

    constructor(public payload: any) {
    }
}


export type TodosActionTypes = GetTodos | GetTodosSuccess | GetTodosFailed;
