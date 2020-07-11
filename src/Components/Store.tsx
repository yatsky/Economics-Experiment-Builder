import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {VariableType, WidgetType} from "./Types";

const defaultPageElement = {
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

}
const pageBuilderSlice = createSlice({
    name: 'pageBuilder',
    initialState: [{
        name: "Page 1",
        selected: true,
        data: [defaultPageElement],
    }],
    reducers: {
        addPb: (state, action: PayloadAction) => [...state, {
            name: "Page " + (state.length + 1).toString(),
            selected: false,
            data: [defaultPageElement],
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
        ),
        addPe: (state, action: PayloadAction) => {
            let pbId = state.findIndex(pb => pb.selected)
            state[pbId].data.push({pageElementId: state[pbId].data.length, ...defaultPageElement})
        },
        deletePe: (state, action: PayloadAction) => {
            let pbId = state.findIndex(pb => pb.selected)
            state[pbId].data.pop()
        },
    }
})

const helpModalIsOpenSlice = createSlice(
    {
        name: "modalIsOpen",
        initialState: false,
        reducers: {
            toggleHelp: (state, action: PayloadAction) => !state
        }
    }
)

const store = configureStore({
    reducer: {
        pageBuilders: pageBuilderSlice.reducer,
        helpModal: helpModalIsOpenSlice.reducer,
    }
},)

// Extract the action creators object and the reducer
// Extract and export each action creator by name
export const {addPb, deletePb, selectPb, addPe, deletePe} = pageBuilderSlice.actions
export const {toggleHelp} = helpModalIsOpenSlice.actions

export default store
export type RootState = ReturnType<typeof store.getState>
