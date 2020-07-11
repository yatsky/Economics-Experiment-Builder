import React, {Props, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import {PageBuilderType, VariableType, WidgetType} from './Types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TextField from "@material-ui/core/TextField";
import useStyles from "./Styles";
import {SvgIconComponent} from "@material-ui/icons";
import store, {addPb, deletePb, RootState} from './Store';
import { useSelector} from "react-redux";

const iconMap: {[key: string]: SvgIconComponent} = {
    "Add": AddIcon,
    "Delete": DeleteIcon,
}

function PageButton(props: {
                        pb: PageBuilderType,
                        handlePageClick: (pageName: string) => void,
                        handlePageNameChange: (e: React.ChangeEvent<{ value: string }>, pageName: string) => void,
                        savePageNameChange: (newPageName: string) => boolean,
                    }
) {

    let [oldName, setOldName] = useState(props.pb.name);

    const handleOnFocus = (e: React.FocusEvent<{ value: string }>) => {
        setOldName(props.pb.name);
    }

    const handleOnBlur = (e: React.FocusEvent<{ value: string }>) => {
        let success = props.savePageNameChange(e.target.value);
        if (!success) props.savePageNameChange(oldName);
    }

    const classes = useStyles();

    return (
        // I used page name as the key but apparently it changes and in that case,
        // React will re-render everything since it cannot track it via its key.
        // Hence the TextField will lose focus.
        // So we use index to be the key to prevent re-render when the page name is changed.
        // see: https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character#:~:text=it%20is%20because%20you%20are,function%20into%20your%20render%20directly.
        <Paper className={classes.menuButton}>
            <ListItem selected={props.pb.selected}>
                {
                    props.pb.selected ? <RadioButtonCheckedIcon/> :
                        <RadioButtonUncheckedIcon onClick={() => props.handlePageClick(props.pb.name)}/>
                }
                <TextField value={props.pb.name} onChange={(e) => props.handlePageNameChange(e, props.pb.name)}
                           onFocus={handleOnFocus}
                           onBlur={handleOnBlur}
                />
            </ListItem>
        </Paper>
    )
}

type StateProps = PageBuilderType[]

type OwnProps = {
    onPageClick: (pageName: string) => void, addPageBuilder: (pageName: string) => void,
    removePageBuilder: () => void,
    handlePageNameChange: (oldName: string, newName: string) => void,
    savePageNameChange: (index: number, newName: string) => boolean,
}


function Sidebar(props: OwnProps) {

    const classes = useStyles();

    const pageBuilders: StateProps = useSelector((state: RootState) => state)

    const handleButtonClick = (e: React.MouseEvent, action: string) => {
        if (action.includes("Add")) store.dispatch(addPb());
        if (action.includes("Delete")) store.dispatch(deletePb());
    };

    const handlePageClick = (pageName: string) => {
        props.onPageClick(pageName);
    }

    const handlePageNameChange = (e: React.ChangeEvent<{ value: string }>, oldName: string) => {
        props.handlePageNameChange(oldName, e.target.value)
        e.preventDefault();
    }

    const saveData = () => {
        // https://gist.github.com/liabru/11263260#gistcomment-2894088
        function download(filename: string, text: string) {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        // Start file download.
        download("experiment_design_data.json", JSON.stringify(pageBuilders));
    };

    const buttons = ["Add Page", "Delete Page"].map((val) => {
        const MyIcon = iconMap[val.split(' ')[0]];
        return (<Button
                className={classes.menuButton}
                startIcon={<MyIcon/>}
                key={val}
                disabled={val.includes("Delete") && pageBuilders.length === 1 ? true : false}
                onClick={(e) => handleButtonClick(e, val)}
            >
                {val}
            </Button>
        );
    });

    const pages = pageBuilders.map((pb, index) => <PageButton key={index}
                                                                    pb={pb}
                                                                    handlePageNameChange={handlePageNameChange}
                                                                    handlePageClick={handlePageClick}
                                                                    savePageNameChange={(newName: string) => props.savePageNameChange(index, newName)}
        />
    );


    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    {buttons}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={saveData}
                    >
                        Save data
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={()=> store.dispatch(addPb(
                            {
                                name: "Page 2",
                                selected: false,
                                data: [
                                    {
                                        pageElementId: 2,
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
                            },
                        ))}
                    >
                        Testing count
                    </Button>
                </List>
                <Divider/>
                <List>
                    {pages}
                </List>
            </div>
        </Drawer>
    );
}

export default Sidebar
