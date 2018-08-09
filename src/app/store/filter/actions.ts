import { Action } from '@ngrx/store';

export const UPDATE_FILTER = '[FILTER] Update';

export class UpdateFilter implements Action {
    readonly type = UPDATE_FILTER;

    constructor(public filter: string) {}
}


export type FiltersActions = UpdateFilter ;
