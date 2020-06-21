import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {HandleValChangePbPeFuncType, PageBuilderType, PageElementDataType, VariableType} from './Config';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        element: {
            display: "inline",
        },
    }),
);

function VariableTypeSelect(props: {
    value: string,
    handleValChange: HandleValChangePbPeFuncType
}) {
    const classes = useStyles();

    const variableTypes = {
        'String Variable': VariableType.StringVariable,
        'Integer Variable': VariableType.IntegerVariable,
        'Currency Variable': VariableType.CurrencyVariable,
        'Boolean Variable': VariableType.BooleanVariable,
        // This is pure text
        'Text': VariableType.PureText,
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        // Why does the for loop changes the type of variableType to string?
        // for(let variableType in VariableType){
        if (e.target.value) {
            let v = variableTypes[e.target.value as string];
            props.handleValChange(v, "varType");
        }
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

function VariableOwner(props: { value: string, handleValChange: HandleValChangePbPeFuncType }) {
    const classes = useStyles();
    const owners = ["Subsession", "Group", "Player"];
    const variableOwnerItems = owners.map((val) => <MenuItem value={val} key={val}>{val}</MenuItem>);
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        // Why does the for loop changes the type of variableType to string?
        // for(let variableType in VariableType){
        if (e.target.value) {
            let v = e.target.value as string;
            props.handleValChange(v, "varOwner");
        }
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

function VariableName(props: { handleValChange: HandleValChangePbPeFuncType, value: string }) {

    // sets the name of a variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        if (e.target.value) {
            let v = e.target.value as string;
            props.handleValChange(v, "varName");
        }
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

function Label(props: { handleValChange: HandleValChangePbPeFuncType, value: string }) {
    // sets the label of a variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        if (e.target.value) {
            let v = e.target.value as string;
            props.handleValChange(v, "varLabel");
        }
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

function Initial({type = "number", handleValChange, value}: { type?: string, handleValChange: HandleValChangePbPeFuncType, value: string | number }) {
    // sets the initial value of a variable
    const classes = useStyles();
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        handleValChange(v, "varInitial");
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

function IntMin(props: { handleValChange: HandleValChangePbPeFuncType, value: number }) {
    // sets the mininum value of an integer variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        props.handleValChange(v, "varMin");
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

function IntMax(props: { handleValChange: HandleValChangePbPeFuncType, value: number }) {
    // sets the mininum value of an integer variable
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let v = e.target.value as string;
        props.handleValChange(v, "varMax");
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

function IntegerVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, data: PageElementDataType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
                handleValChange={props.handleValChange}/>
            <VariableOwner
                value={props.data.varOwner!}
                handleValChange={props.handleValChange}/>
            <Label
                value={props.data.varLabel}
                handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.data.varInitial as string}
            />
            <IntMin
                handleValChange={props.handleValChange}
                value={props.data.varMin!}
            />
            <IntMax
                handleValChange={props.handleValChange}
                value={props.data.varMax!}
            />
        </div>
    );
}

function StringVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, data: PageElementDataType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
                handleValChange={props.handleValChange}/>
            <VariableOwner
                value={props.data.varOwner!}
                handleValChange={props.handleValChange}/>
            <Label
                value={props.data.varLabel}
                handleValChange={props.handleValChange}/>
            <Initial
                type="string"
                handleValChange={props.handleValChange}
                value={props.data.varInitial!}
            />
        </div>
    );
}

function CurrencyVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, data: PageElementDataType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
                handleValChange={props.handleValChange}/>
            <VariableOwner
                value={props.data.varOwner!}
                handleValChange={props.handleValChange}/>
            <Label
                value={props.data.varLabel}
                handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.data.varInitial!}
            />
            <IntMin
                handleValChange={props.handleValChange}
                value={props.data.varMin!}
            />
            <IntMax
                handleValChange={props.handleValChange}
                value={props.data.varMax!}
            />
        </div>
    );
}

function BooleanVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, data: PageElementDataType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
                handleValChange={props.handleValChange}/>
            <VariableOwner
                value={props.data.varOwner!}
                handleValChange={props.handleValChange}/>
            <Label
                value={props.data.varLabel}
                handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.data.varInitial as string}
            />
        </div>
    );
}

function PureTextContent(props: { handleValChange: HandleValChangePbPeFuncType, data: PageElementDataType }) {

    return (
        <div>
            <VariableName
                value={props.data.varName}
                handleValChange={props.handleValChange}/>
            <Label
                value={props.data.varLabel}
                handleValChange={props.handleValChange}/>
            <TextareaAutosize
                aria-label="Copy paste in the text like introduction, context, etc."
                rowsMin={3}
                placeholder="Copy paste in the text like introduction, context, etc."
                onChange={(e) => props.handleValChange(e.target.textContent!, "varText")}
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
    pageBuilder: PageBuilderType,
    handleValChange: HandleValChangePbPeFuncType
}) {

    const VariableContentFunc = variableContentMap[props.pageBuilder.data.varType];
    return (
        <div>
            <Paper>
                <VariableTypeSelect
                    value={props.pageBuilder.data.varType}
                    handleValChange={props.handleValChange}
                />
                <VariableContentFunc
                    handleValChange={props.handleValChange}
                    data={props.pageBuilder.data}
                />
            </Paper>
        </div>
    );
}
