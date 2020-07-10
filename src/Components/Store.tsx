import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { VariableType, WidgetType} from "./Types";

const pageBuilderSlice = createSlice({
    name: 'pageBuilder',
    initialState: [{
        name: "Page 1",
        selected: true,
        data: [
            {
                pageElementId: 1,
                varType: VariableType.IntegerVariable,
                varName: "",
                varLabel: "",
                varInitial: "",
                varOwner: "Subsession",
                varMin: 0,
                varMax: 0,
                varText: "",
                varWidget: WidgetType.HRadioSelect,
            }],
    }],
    reducers: {
        addPb: (state: PageBuilderType[], action) => [...state, action.payload],
        deletePb: (state, action: PayloadAction<number>) => state,
        updatePb: (state, action: PayloadAction<{}>) => state,
    }
})

const store = configureStore({
    reducer: pageBuilderSlice.reducer
},)

// Extract the action creators object and the reducer
const {actions, reducer} = pageBuilderSlice;
// Extract and export each action creator by name
export const {addPb} = actions
// Export the reducer, either as a default or named export
export {reducer}

export default store
export type RootState = ReturnType<typeof pageBuilderSlice.reducer>
