import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import ToolbarButton from './ToolbarButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import {SvgIconComponent} from "@material-ui/icons";
import store, {addPe, deletePe} from "./Store";


const iconMap: { [key: string]: SvgIconComponent } = {
    "Add": AddIcon,
    "Delete": DeleteIcon,
    "Help": HelpIcon,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);
export default function MyToolbar(props: { handleClick: (btnName: string) => void }) {
    const classes = useStyles();
    const buttons = ["Add", "Delete", "Help"].map((val) => {
        const MyIcon = iconMap[val];
        return (
            <ToolbarButton className={classes.menuButton} icon={<MyIcon/>}
                           key={val}
                           buttonLabel={val}
                           handleClick={() => store.dispatch(val.includes("Add") ? addPe() : deletePe())}
            />
        );
    });
    return (
        <Toolbar>{buttons}</Toolbar>
    );
}