import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import {PageBuilderType} from './Types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TextField from "@material-ui/core/TextField";
import useStyles from "./Styles";
import {SvgIconComponent} from "@material-ui/icons";
import store, {addPb, deletePb, RootState, selectPb, updatePbName} from './Store';
import {useSelector} from "react-redux";

const iconMap: { [key: string]: SvgIconComponent } = {
    "Add": AddIcon,
    "Delete": DeleteIcon,
}

function PageButton(props: {
                        pb: PageBuilderType,
                    }
) {

    // Save name change
    const handleNameChange = (e: React.ChangeEvent<{ value: string }>) => {
        store.dispatch(updatePbName({pbId: props.pb.pbId, newName: e.target.value}))
    }

    const classes = useStyles();

    return (
        <Paper className={classes.menuButton}>
            <ListItem selected={props.pb.selected}>
                {
                    props.pb.selected ? <RadioButtonCheckedIcon/> :
                        <RadioButtonUncheckedIcon onClick={() => store.dispatch(selectPb(props.pb.pbId))}/>
                }
                <TextField value={props.pb.name} onChange={handleNameChange}
                />
            </ListItem>
        </Paper>
    )
}

type StateProps = PageBuilderType[]

function Sidebar() {

    const classes = useStyles();

    const pageBuilders: StateProps = useSelector((state: RootState) => state.pageBuilders)

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
                onClick={() => store.dispatch(val.includes("Add") ? addPb() : deletePb())}
            >
                {val}
            </Button>
        );
    });

    const pages = pageBuilders.map((pb, index) => <PageButton key={index}
                                                              pb={pb}
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
