import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore ( initailState ) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTIONS_COMPOSE__ || compose // add support for dev tools
    return createStore ( 
        rootReducer, 
        initailState, 
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
}