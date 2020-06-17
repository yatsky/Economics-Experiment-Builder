import React, {useState} from 'react';
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
    value: string, onChange: (content: VariableType) => void,
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
            props.onChange(v);
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

function VariableOwner(props: { handleValChange: HandleValChangePbPeFuncType }) {
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

function VariableName(props: { handleValChange: HandleValChangePbPeFuncType }) {

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

function Label(props: { handleValChange: HandleValChangePbPeFuncType }) {
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

function Initial({type = "number", handleValChange, value}: { type?: string, handleValChange: HandleValChangePbPeFuncType, value: string }) {
    // sets the initial value of a variable
    const classes = useStyles();

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
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => handleValChange(e.target.value as string, "varInitial")}
                    value={value}
                />
            </FormControl>
        </span>
    );
}

function IntMin(props: { handleValChange: HandleValChangePbPeFuncType, value: number }) {
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
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => props.handleValChange(e.target.value as string, "varMin")}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function IntMax(props: { handleValChange: HandleValChangePbPeFuncType, value: number }) {
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
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => props.handleValChange(e.target.value as string, "varMax")}
                    value={props.value}
                />
            </FormControl>
        </span>
    );
}

function IntegerVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, value: PageElementDataType }) {

    return (
        <div>
            <VariableName handleValChange={props.handleValChange}/>
            <VariableOwner handleValChange={props.handleValChange}/>
            <Label handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.value.varInitial as string}
            />
            <IntMin
                handleValChange={props.handleValChange}
                value={props.value.varMin!}
            />
            <IntMax
                handleValChange={props.handleValChange}
                value={props.value.varMax!}
            />
        </div>
    );
}

function StringVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, value: PageElementDataType }) {

    return (
        <div>
            <VariableName handleValChange={props.handleValChange}/>
            <VariableOwner handleValChange={props.handleValChange}/>
            <Label handleValChange={props.handleValChange}/>
            <Initial
                type="string"
                handleValChange={props.handleValChange}
                value={props.value.varInitial as string}
            />
        </div>
    );
}

function CurrencyVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, value: PageElementDataType }) {

    return (
        <div>
            <VariableName handleValChange={props.handleValChange}/>
            <VariableOwner handleValChange={props.handleValChange}/>
            <Label handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.value.varInitial as string}
            />
            <IntMin
                handleValChange={props.handleValChange}
                value={props.value.varMin!}
            />
            <IntMax
                handleValChange={props.handleValChange}
                value={props.value.varMax!}
            />
        </div>
    );
}

function BooleanVariableContent(props: { handleValChange: HandleValChangePbPeFuncType, value: PageElementDataType }) {

    return (
        <div>
            <VariableName handleValChange={props.handleValChange}/>
            <VariableOwner handleValChange={props.handleValChange}/>
            <Label handleValChange={props.handleValChange}/>
            <Initial
                handleValChange={props.handleValChange}
                value={props.value.varInitial as string}
            />
        </div>
    );
}

function PureTextContent(props: { handleValChange: HandleValChangePbPeFuncType, value: PageElementDataType }) {

    return (
        <div>
            <VariableName handleValChange={props.handleValChange}/>
            <Label handleValChange={props.handleValChange}/>
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
    const [content, setContent] = useState(VariableType.IntegerVariable);

    const VariableContentFunc = variableContentMap[content];
    return (
        <div>
            <Paper>
                <VariableTypeSelect
                    value={props.pageBuilder.data.varType}
                    onChange={setContent}
                    handleValChange={props.handleValChange}
                />
                <VariableContentFunc
                    value={props.pageBuilder.data}
                    handleValChange={props.handleValChange}
                />
            </Paper>
        </div>
    );
}
