import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducers} from './index';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
    ]
})
export class TodoStoreModule {
}
