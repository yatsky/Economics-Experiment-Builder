import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {HandleValChangeFuncType, PageElementType, VariableType, WidgetType} from "./Types";
import { v4 as uuidv4 } from 'uuid';

// We have to type this
// Otherwise we can't update pageBuilder.data[dataField]
// It will give TS7053
const defaultPageElement: PageElementType = {
    pageElementId: 1,
    selected: true,
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
        pbId: uuidv4(),
        name: "Page 1",
        selected: true,
        data: [defaultPageElement],
    }],
    reducers: {
        addPb: (state, action: PayloadAction) => [...state, {
            pbId: uuidv4(),
            name: "Page " + (state.length + 1).toString(),
            selected: false,
            data: [defaultPageElement],
        }],
        deletePb: (state, action: PayloadAction) => {
            // https://github.com/immerjs/immer/issues/115
            state.splice(state.findIndex(pb => pb.selected), 1)
            state[0].selected = true
        },
        updatePbName: (state, action: PayloadAction<{pbId: string, newName: string}>) => {
            console.log(action.payload.newName)
            state.filter(pb => pb.pbId === action.payload.pbId)[0].name=action.payload.newName
        },
        selectPb: (state, action:PayloadAction<string>) => state.forEach((pb) => pb.pbId === action.payload ? pb.selected = true : pb.selected = false),
        addPe: (state, action: PayloadAction) => {
            let pbId = state.findIndex(pb => pb.selected)
            state[pbId].data.push({pageElementId: state[pbId].data.length, ...defaultPageElement})
        },
        deletePe: (state, action: PayloadAction) => {
            let pbId = state.findIndex(pb => pb.selected)
            state[pbId].data.pop()
        },
        updatePe: (state, action: PayloadAction<{pbId: string, pageElementId: number, val: VariableType | number | string, dataField: string}>) => {
            const {pbId, pageElementId, val, dataField} = action.payload
            let pb = state.filter(pb => pb.pbId === pbId)[0]
            pb.data[pageElementId][dataField] = val
        }
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
export const {addPb, deletePb, updatePbName, selectPb, addPe, deletePe, updatePe} = pageBuilderSlice.actions
export const {toggleHelp} = helpModalIsOpenSlice.actions

export default store
export type RootState = ReturnType<typeof store.getState>
