import * as FilterActions from './actions';

export function reducerFilter (state: string = "ALL", action: FilterActions.Actions) {
    switch (action.type) {
        case FilterActions.UPDATE_FILTER:
            return action.filter;
        default:
            return state;

    }

}
