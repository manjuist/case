import { 
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import { setShowMoreHome } from '../views/home/homeRedux'

const sagaMiddleware = createSagaMiddleware()
const middleWare = [thunk, logger, sagaMiddleware]
const store = createStore(
    combineReducers({ setShowMoreHome }),
    applyMiddleware(...middleWare)
)

sagaMiddleware.run(saga);

export default store
