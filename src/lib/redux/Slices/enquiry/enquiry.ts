import { createSlice } from '@reduxjs/toolkit';

const initialState: {
	enquiry: Enquiry[];
} = { enquiry: [] };

const enquirySlice = createSlice({
	name: 'enquiry',
	initialState,
	reducers: {
		updateEnquiry: (state, action) => {
			state.enquiry = action.payload;
		},
	},
});

export const { updateEnquiry } = enquirySlice.actions;
export default enquirySlice.reducer;
