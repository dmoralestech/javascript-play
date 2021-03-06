const ADD_TODO = 'ADD_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

let initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'Consider using Redux',
            completed: true,
        },
        {
            text: 'Keep all state in a single tree',
            completed: false
        }
    ]
}

/*
 function todoApp(state = initialState, action) {
 switch (action.type) {
 case SET_VISIBILITY_FILTER:
 return Object.assign({}, state, {
 visibilityFilter: action.filter
 });
 case ADD_TODO:
 return Object.assign({}, state, {
 todos: [
 ...state.todos,
 {
 text: action.text,
 completed: false
 }
 ]
 });
 case TOGGLE_TODO:
 return Object.assign({}, state, {
 todos: state.todos.map((todo, index) => {
 if (index === action.index) {
 return Object.assign({}, todo, {
 completed: !todo.completed
 })
 }
 return todo
 })
 });
 default:
 return state
 }
 }
 */

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todoApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}


console.log(todoApp(initialState, {type: ADD_TODO, text: 'hello there', completed: false}));
