/// <reference path="/Users/olgaievtukhova/Dev/todo/node_modules/@types/jasmine/index.d.ts"/>

import {Todo} from "../todo"

let todo: Todo;
todo = {id:1, name:"test", completed:false};


let customMatchers: jasmine.CustomMatcherFactories = {
    toBeInstanceOfTodo: function(util, customEqualityTesters) {
        return {
            compare: function(actual){
                let pass = (JSON.stringify(Object.keys(actual).sort()) == JSON.stringify(Object.keys(todo).sort()));
                console.log("actual instance of expected? ", pass);
                let result = {
                    pass: pass,
                    message: `Expected actual to ${pass ? 'not' : ''} be instance of expected`,
                };
                return result;
            },
        };
    }
};

export { customMatchers };
