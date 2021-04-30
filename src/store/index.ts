import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from './reducers'

export * as Targets from './constants'
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
