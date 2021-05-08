// import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
// import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { userSlice } from './user/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { orderSlice } from './order/slice'

const rootReducer = combineReducers({
	language: languageReducer,
	recommendProducts: recommendProductsReducer,
	productDetail: productDetailSlice.reducer,
	productSearch: productSearchSlice.reducer,
	user: userSlice.reducer,
	shoppingCart: shoppingCartSlice.reducer,
	order: orderSlice.reducer,
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export default store
