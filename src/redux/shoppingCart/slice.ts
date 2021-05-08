import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
	loading: boolean
	error: string | null
	items: any[]
}

const initialState: ShoppingCartState = {
	loading: true,
	error: null,
	items: [],
}

export const getShoppingCart = createAsyncThunk(
	'shoppingCart/getShoppingCart',
	async (jwt: string, thunkAPI) => {
		const { data } = await axios.get(
			`https://run.mocky.io/v3/7efc03db-7125-4494-a1e8-7811f5035c18`,
		)
		return data.shoppingCartItems
	},
)

export const addShoppingCartItem = createAsyncThunk(
	'shoppingCart/addShoppingCartItem',
	async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
		const { data } = await axios.post(
			`https://run.mocky.io/v3/ddd86523-c86f-4ca1-ad83-bf392f2693ab`,
			{
				touristRouteId: parameters.touristRouteId,
			},
			{
				headers: {
					Authorization: `bearer ${parameters.jwt}`,
				},
			},
		)
		return data.shoppingCartItems
	},
)

export const clearShoppingCartItem = createAsyncThunk(
	'shoppingCart/clearShoppingCartItem',
	async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
		return await axios.delete(
			`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
				',',
			)})`,
			{
				headers: {
					Authorization: `bearer ${parameters.jwt}`,
				},
			},
		)
	},
)

export const checkout = createAsyncThunk(
	'shoppingCart/checkout',
	async (jwt: string, thunkAPI) => {
		const { data } = await axios.post(
			`https://run.mocky.io/v3/758cd55c-6cb1-4f54-b5df-9031325828c7`,
			null,
			{
				headers: {
					Authorization: `bearer ${jwt}`,
				},
			},
		)
		return data
	},
)

export const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {},
	extraReducers: {
		[getShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[getShoppingCart.fulfilled.type]: (state, action) => {
			state.items = action.payload
			state.loading = false
			state.error = null
		},
		[getShoppingCart.rejected.type]: (
			state,
			action: PayloadAction<string | null>,
		) => {
			state.loading = false
			state.error = action.payload
		},
		[addShoppingCartItem.pending.type]: (state) => {
			state.loading = true
		},
		[addShoppingCartItem.fulfilled.type]: (state, action) => {
			state.items = action.payload
			state.loading = false
			state.error = null
		},
		[addShoppingCartItem.rejected.type]: (
			state,
			action: PayloadAction<string | null>,
		) => {
			state.loading = false
			state.error = action.payload
		},
		[clearShoppingCartItem.pending.type]: (state) => {
			state.loading = true
		},
		[clearShoppingCartItem.fulfilled.type]: (state) => {
			state.items = []
			state.loading = false
			state.error = null
		},
		[clearShoppingCartItem.rejected.type]: (
			state,
			action: PayloadAction<string | null>,
		) => {
			state.loading = false
			state.error = action.payload
		},
		[checkout.pending.type]: (state) => {
			state.loading = true
		},
		[checkout.fulfilled.type]: (state, action) => {
			state.items = []
			state.loading = false
			state.error = null
		},
		[checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
			state.loading = false
			state.error = action.payload
		},
	},
})
