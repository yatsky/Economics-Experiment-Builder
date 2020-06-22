import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import {drawerWidth} from './Config';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(1),
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
export default function Sidebar(props: {
    pageBuilders: any[], onPageClick: (pageName: string) => void, addPageBuilder: (pageName: string) => void,
    removePageBuilder: () => void
}) {

    const classes = useStyles();

    const handleButtonClick = (e: React.MouseEvent, action: string) => {
        if (action.includes("Add")) props.addPageBuilder("Page " + (props.pageBuilders.length + 1).toString());
        if (action.includes("Delete")) props.removePageBuilder();
    };

    const handlePageClick = (e: React.MouseEvent) => {
        props.onPageClick(e.currentTarget.textContent!);
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
        download("experiment_design_data.json", JSON.stringify(props.pageBuilders));
    };

    const buttons = ["Add Page", "Delete Page"].map((val) => {
        const MyIcon = iconMap[val.split(' ')[0]];
        return (<Button
                className={classes.menuButton}
                startIcon={<MyIcon/>}
                key={val}
                disabled={val.includes("Delete") && props.pageBuilders.length === 1 ? true : false}
                onClick={(e) => handleButtonClick(e, val)}
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
                    {props.pageBuilders.map((pb, index) => (
                        <Paper key={pb.name} className={classes.menuButton}>
                            <ListItem button onClick={handlePageClick}>
                                <ListItemText primary={pb.name}/>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}