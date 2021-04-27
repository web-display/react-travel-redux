import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductDetailState {
	loading: boolean
	error: string | null
	data: any
}
const initialState: ProductDetailState = {
	loading: true,
	error: null,
	data: null,
}

export const getProductDetail = createAsyncThunk(
	'productDetail/getProductDetail',
	async (touristRouteId: string, thunkAPI) => {
		const { data } = await axios.get(
			`https://run.mocky.io/v3/5a108ca7-4c5f-4141-964b-e8200a57e40a`,
		)
		return data
	},
)

export const productDetailSlice = createSlice({
	name: 'productDetail',
	initialState,
	reducers: {},
	extraReducers: {
		[getProductDetail.pending.type]: (state) => {
			// return { ...state, loading: true };
			state.loading = true
		},
		[getProductDetail.fulfilled.type]: (state, action) => {
			state.data = action.payload
			state.loading = false
			state.error = null
		},
		[getProductDetail.rejected.type]: (
			state,
			action: PayloadAction<string | null>,
		) => {
			//   const ddd = action.payload;
			state.loading = false
			state.error = action.payload
		},
	},
})
