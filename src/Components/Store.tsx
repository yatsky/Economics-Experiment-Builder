import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {PageElementSubElementPropsType, PageElementType} from "./Types";

const pageBuilderSlice = createSlice({
    name: 'pageBuilder',
    initialState: 0,
    reducers: {
        addPb: (state, action: PayloadAction<{}>) => state,
        deletePb: (state, action) => state,
        updatePb: (state, action: PayloadAction<{}>) => state,
    }
})

const store = configureStore({
    reducer: pageBuilderSlice.reducer
},)

// Extract the action creators object and the reducer
const { actions, reducer } = pageBuilderSlice;
// Extract and export each action creator by name
export const { addPb } = actions
// Export the reducer, either as a default or named export
export { reducer }

export default store

