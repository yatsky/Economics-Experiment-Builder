import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 140;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            marginBottom: 10,
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
    }),
);


const iconMap = {
    "Add": AddIcon,
    "Delete": DeleteIcon,
}
export default function Sidebar() {

    const classes = useStyles();
    const buttons = ["Add Page", "Delete Page"].map((val) => {
        const MyIcon = iconMap[val.split(' ')[0]];
        return (<Button
            className={classes.menuButton}
            startIcon={<MyIcon />}
            key={val}
            >
            {val}
        </Button>
        );
    });
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {buttons}
                </List>
                <Divider />
                <List>
                    {['Page 1', 'Page 2', 'Page 3', 'Page 4'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <NoteIcon /> : <NoteIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}