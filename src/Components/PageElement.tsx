import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {PageElementSubElementPropsType, PageElementType, VariableType, WidgetType} from './Types';
import useStyles from "./Styles";
import store, {selectPe, updatePe} from './Store';
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";


function VariableTypeSelect(props: PageElementSubElementPropsType) {
    const classes = useStyles();
    const variableTypes: { [key: string]: VariableType } = {
        'String Variable': VariableType.StringVariable,
        'Integer Variable': VariableType.IntegerVariable,
        'Currency Variable': VariableType.CurrencyVariable,
        'Boolean Variable': VariableType.BooleanVariable,
        // This is pure text
        'Text': VariableType.PureText,
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = variableTypes[e.target.value as string];
        store.dispatch(updatePe({val: v, dataField: "varType"}))
    };

    const variableTypeItems = Object.keys(variableTypes).map((val) => <MenuItem value={variableTypes[val]}
                                                                                key={val}>{variableTypes[val]}</MenuItem>);
    return (
        <div className={classes.element}>
            <FormControl className={classes.formControl}>
                <InputLabel>Variable Type</InputLabel>
                <Select
                    value={props.value}
                    onChange={handleChange}
                >
                    {variableTypeItems}
                </Select>
            </FormControl>
        </div>
    );
}

function VariableOwner(props: PageElementSubElementPropsType) {
    const classes = useStyles();
    const owners = ["Subsession", "Group", "Player"];
    const variableOwnerItems = owners.map((val) => <MenuItem value={val} key={val}>{val}</MenuItem>);
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varOwner"}))
    };
    return (
        <div className={classes.element}>
            <FormControl className={classes.formControl}>
                <InputLabel>Variable Owner</InputLabel>
                <Select
                    value={props.value}
                    onChange={handleChange}
                >
                    {variableOwnerItems}
                </Select>
            </FormControl>
        </div>
    );
}

function VariableWidget(props:PageElementSubElementPropsType) {

    const classes = useStyles();
    // https://github.com/microsoft/TypeScript/issues/17198#issuecomment-358666450
    const widgets = Object.values(WidgetType);
    const variableOwnerItems = widgets.map((val) => <MenuItem value={val} key={val}>{val}</MenuItem>);
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varWidget"}))
    };
    return (
        <div className={classes.element}>
            <FormControl className={classes.formControl}>
                <InputLabel>Variable Widget</InputLabel>
                <Select
                    value={props.value}
                    onChange={handleChange}
                >
                    {variableOwnerItems}
                </Select>
            </FormControl>
        </div>
    );
}

function VariableName(props: PageElementSubElementPropsType) {

    // sets the name of a variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varName"}))
    };
    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Variable name"
                    onChange={handleChange}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function Label(props: PageElementSubElementPropsType) {
    // sets the label of a variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varLabel"}))
    };
    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="label"
                    label="Label"
                    multiline
                    rowsMax={4}
                    onChange={handleChange}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function Initial({type = "number", value}: { type?: string, value: string | number }) {
    // sets the initial value of a variable
    const classes = useStyles();
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        //handleValChange(v, "varInitial");
        store.dispatch(updatePe({val: v, dataField: "varInitial"}))
    };

    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="initial-value"
                    label="Initial value"
                    type={type}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    value={value}
                />
            </FormControl>
        </span>
    );
}

function IntMin(props: { value: number }) {
    // sets the mininum value of an integer variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varMin"}))
        e.preventDefault();
    };
    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="int-min"
                    label="Minimum value"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function IntMax(props: PageElementSubElementPropsType) {
    // sets the mininum value of an integer variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        store.dispatch(updatePe({val: v, dataField: "varMax"}))
        e.preventDefault();
    };
    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="int-max"
                    label="Maximum value"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function IntegerVariableContent(props: { data: PageElementType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
            />
            <VariableOwner
                value={props.data.varOwner!}
            />
            <Label
                value={props.data.varLabel}
            />
            <Initial

                value={props.data.varInitial as string}
            />
            <IntMin

                value={props.data.varMin!}
            />
            <IntMax

                value={props.data.varMax!}
            />
        </div>
    );
}

function StringVariableContent(props: { data: PageElementType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
            />
            <VariableOwner
                value={props.data.varOwner!}
            />
            <Label
                value={props.data.varLabel}
            />
            <Initial
                type="string"

                value={props.data.varInitial!}
            />
        </div>
    );
}

function CurrencyVariableContent(props: { data: PageElementType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
            />
            <VariableOwner
                value={props.data.varOwner!}
            />
            <Label
                value={props.data.varLabel}
            />
            <Initial

                value={props.data.varInitial!}
            />
            <IntMin

                value={props.data.varMin!}
            />
            <IntMax

                value={props.data.varMax!}
            />
        </div>
    );
}

function BooleanVariableContent(props: { data: PageElementType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
            />
            <VariableOwner
                value={props.data.varOwner!}
            />
            <Label
                value={props.data.varLabel}
            />
            <Initial

                value={props.data.varInitial as string}
            />
        </div>
    );
}

function PureTextContent() {

    const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
        store.dispatch(updatePe({val: e.target.value!, dataField: "varInitial"}))
        e.preventDefault();
    };

    return (
        <div>
            <TextareaAutosize
                aria-label="Copy paste in the text like introduction, context, etc."
                rowsMin={3}
                placeholder="Copy paste in the text like introduction, context, etc."
                onChange={handleChange}
            />
        </div>
    );
}

const variableContentMap = {
    // Use computed property
    [VariableType.IntegerVariable]: IntegerVariableContent,
    [VariableType.StringVariable]: StringVariableContent,
    [VariableType.BooleanVariable]: BooleanVariableContent,
    [VariableType.CurrencyVariable]: CurrencyVariableContent,
    [VariableType.PureText]: PureTextContent,
}

export default function PageElement(props: {
    data: PageElementType,
}) {

    const classes = useStyles();
    const VariableContentFunc = variableContentMap[props.data.varType];
    return (
        <div>
            <Paper className={classes.paper}>

                {
                    props.data.selected ? <RadioButtonCheckedIcon className={classes.checkbox}/> :
                        <RadioButtonUncheckedIcon className={classes.checkbox} onClick={() => {
                            store.dispatch(selectPe(props.data.pageElementId))
                        }}/>
                }
                <VariableTypeSelect
                    value={props.data.varType}
                />
                <VariableWidget
                    value={props.data.varWidget}
                />
                <VariableContentFunc
                    data={props.data}
                />
            </Paper>
        </div>
    );
}
