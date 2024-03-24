import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './Slices/project/projectSlice';
import enquiryReducer from './Slices/enquiry/enquiry';
import { apiEnquirySlice } from './api/apiEnquirySlice';
import { apiProjectSlice } from './api/apiProjectSlice';

export const store = configureStore({
	reducer: {
		project: projectReducer,
		enquiry: enquiryReducer,
		[apiEnquirySlice.reducerPath]: apiEnquirySlice.reducer,
		[apiProjectSlice.reducerPath]: apiProjectSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			apiEnquirySlice.middleware,
			apiProjectSlice.middleware
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
