import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from '../../todo';

export const GET_TODOS = '[TODO] Get';

export class GetTodos implements Action {
    readonly type = GET_TODOS;

    constructor(public todos: Todo[]) {}
}


export type Actions = GetTodos ;
