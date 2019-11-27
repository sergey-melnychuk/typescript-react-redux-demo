// index.ts allows importing from enclosing folder (not specific file)

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { employeeReducer } from './reducers'

export const makeStore = () => {
    const middleware = [thunk]

    const store = createStore(employeeReducer, composeWithDevTools({
        name: "React Redux LOL WTF"
    })(
        applyMiddleware(...middleware)
    ))
    return store
}

/*

// plain redux
dispatch({type: "my action"})

// redux-thunk
dispatch(function(dispatch) {
    dispatch({type: "gimme data"})
    http.get()
        .then(() => dispatch({type: "ok"}))
        .catch(() => dispatch({type: "failed"}))
})

// others: redux-sage, redux-observable

*/
