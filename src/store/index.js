import { 
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { setShowMoreHome } from '../views/home/homeRedux'

const middleWare = [thunk, logger]
const store = createStore(
    combineReducers({ setShowMoreHome }),
    applyMiddleware(...middleWare)
)

export default store
