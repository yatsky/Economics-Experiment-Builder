import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    }),
);

enum FieldType {
    StringField,
    IntegerField,
    CurrencyField,
    BooleanField,
    // This is pure text
    TextField,
}
function FieldTypeSelect(props: { onChange: (content: FieldType) => void }) {
    const classes = useStyles();
    const [fieldType, setFieldType] = React.useState('');

    const fieldTypes = {
        'StringField': FieldType.StringField,
        'IntegerField': FieldType.IntegerField,
        'CurrencyField': FieldType.CurrencyField,
        'BooleanField': FieldType.BooleanField,
        // This is pure text
        'TextField': FieldType.TextField,
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        // Why does the for loop changes the type of fieldType to string?
        // for(let fieldType in FieldType){

        let fieldType: FieldType = fieldTypes[e.target.value as string];
        props.onChange(fieldType);
        setFieldType(e.target.value as string);
    };

    const fieldTypeItems = Object.keys(fieldTypes).map((val) => <MenuItem value={val}>{val}</MenuItem>);
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Field Type</InputLabel>
                <Select
                    value={fieldType}
                    onChange={handleChange}
                >
                    {fieldTypeItems}
                </Select>
            </FormControl>
        </div>
    );
}

function Label() {
    // sets the label of a field
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
    // sets the initial value of a field
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
    // sets the mininum value of an integer field
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
    // sets the mininum value of an integer field
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
function IntegerFieldContent() {

    return (
        <div>
            <Label />
            <Initial />
            <IntMin />
            <IntMax />
        </div>
    );
}

function StringFieldContent() {

    return (
        <div>
            <Label />
            <Initial />
        </div>
    );
}

function CurrencyFieldContent() {

    return (
        <div>
            <Label />
            <Initial />
            <IntMin />
            <IntMax />
        </div>
    );
};

function BooleanFieldContent() {

    return (
        <div>
            <Label />
            <Initial />
        </div>
    );
};
function TextFieldContent() {

    return (
        <div>
            <Label />
            <Initial />
        </div>
    );
};
const fieldContentMap = {
    // Use computed property
    [FieldType.IntegerField]: IntegerFieldContent,
    [FieldType.StringField]: StringFieldContent,
    [FieldType.BooleanField]: BooleanFieldContent,
    [FieldType.CurrencyField]: CurrencyFieldContent,
    [FieldType.TextField]: TextFieldContent,
}

export default function PageElement() {
    const [content, setContent] = useState(FieldType.IntegerField);

    const FieldContentFunc = fieldContentMap[content];
    return (
        <div>
            <FieldTypeSelect onChange={setContent} />
            <FieldContentFunc />
        </div>
    );
}
