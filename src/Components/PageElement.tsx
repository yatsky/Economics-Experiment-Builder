import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

enum VariableType {
    StringVariable,
    IntegerVariable,
    CurrencyVariable,
    BooleanVariable,
    // This is pure text
    PureText,
}
function VariableTypeSelect(props: { onChange: (content: VariableType) => void }) {
    const classes = useStyles();
    const [variableType, setVariableType] = React.useState('');

    const variableTypes = {
        'StringVariable': VariableType.StringVariable,
        'IntegerVariable': VariableType.IntegerVariable,
        'CurrencyVariable': VariableType.CurrencyVariable,
        'BooleanVariable': VariableType.BooleanVariable,
        // This is pure text
        'PureText': VariableType.PureText,
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        // Why does the for loop changes the type of variableType to string?
        // for(let variableType in VariableType){

        let variableType: VariableType = variableTypes[e.target.value as string];
        props.onChange(variableType);
        setVariableType(e.target.value as string);
    };

    const variableTypeItems = Object.keys(variableTypes).map((val) => <MenuItem value={val} key={val}>{val}</MenuItem>);
    return (
        <div className={classes.element}>
            <FormControl className={classes.formControl}>
                <InputLabel>Variable Type</InputLabel>
                <Select
                    value={variableType}
                    onChange={handleChange}
                >
                    {variableTypeItems}
                </Select>
            </FormControl>
        </div>
    );
}

function VariableOwner() {
    const classes = useStyles();
    const owners = ["Subsession", "Group", "Player"];
    const variableOwnerItems = owners.map((val) => <MenuItem value={val} key={val}>{val}</MenuItem>);
    return (
        <div className={classes.element}>
            <FormControl className={classes.formControl}>
                <InputLabel>Variable Owner</InputLabel>
                <Select
                    value="Subsession"
                >
                    {variableOwnerItems}
                </Select>
            </FormControl>
        </div>
    );
}

function VariableName() {

    // sets the name of a variable
    const classes = useStyles();

    const handleChange = () => {

    }
    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Variable name"
                    onChange={handleChange}
                />
            </FormControl>
        </span>
    );
}
function Label() {
    // sets the label of a variable
    const classes = useStyles();

    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="label"
                    label="Label"
                    multiline
                    rowsMax={4}
                />
            </FormControl>
        </span>
    );
}
function Initial() {
    // sets the initial value of a variable
    const classes = useStyles();

    return (
        <span>
            <FormControl className={classes.formControl}>
                <TextField
                    id="initial-value"
                    label="Initial value"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
        </span>
    );
}
function IntMin() {
    // sets the mininum value of an integer variable
    const classes = useStyles();

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
                />
            </FormControl>
        </span>
    );
}
function IntMax() {
    // sets the mininum value of an integer variable
    const classes = useStyles();

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
                />
            </FormControl>
        </span>
    );
}
function IntegerVariableContent() {

    return (
        <div>
            <VariableName />
            <Label />
            <Initial />
            <IntMin />
            <IntMax />
        </div>
    );
}

function StringVariableContent() {

    return (
        <div>
            <VariableName />
            <Label />
            <Initial />
        </div>
    );
}

function CurrencyVariableContent() {

    return (
        <div>
            <VariableName />
            <Label />
            <Initial />
            <IntMin />
            <IntMax />
        </div>
    );
};

function BooleanVariableContent() {

    return (
        <div>
            <VariableName />
            <Label />
            <Initial />
        </div>
    );
};
function PureTextContent() {

    return (
        <div>
            <VariableName />
            <Label />
            <Initial />
        </div>
    );
};

const variableContentMap = {
    // Use computed property
    [VariableType.IntegerVariable]: IntegerVariableContent,
    [VariableType.StringVariable]: StringVariableContent,
    [VariableType.BooleanVariable]: BooleanVariableContent,
    [VariableType.CurrencyVariable]: CurrencyVariableContent,
    [VariableType.PureText]: PureTextContent,
}

export default function PageElement() {
    const [content, setContent] = useState(VariableType.IntegerVariable);

    const VariableContentFunc = variableContentMap[content];
    return (
        <div>
            <Paper>
                <VariableTypeSelect onChange={setContent} />
                <VariableOwner />
                <VariableContentFunc />
            </Paper>
        </div>
    );
}
