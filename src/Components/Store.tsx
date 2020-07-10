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
        addPb: (state, action:PayloadAction) => [...state, {
            name: "Page " + (state.length + 1).toString(),
            selected: false,
            data: [
                {
                    pageElementId: state.length,
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
        deletePb: (state, action: PayloadAction) => {
            // https://github.com/immerjs/immer/issues/115
            state.splice(state.findIndex(pb => pb.selected), 1)
            state[0].selected = true
        },
        updatePb: (state, action: PayloadAction) => state,
        selectPb: (state, action) => state.map((pb, idx) => {
            pb.selected = idx === action.payload
            return pb
            }
        )
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
