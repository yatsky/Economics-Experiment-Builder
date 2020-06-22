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
import {drawerWidth, PageBuilderType} from './Config';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TextField from "@material-ui/core/TextField";
import PageBuilder from "./PageBuilder";

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

function PageButton(props: {
    pb: PageBuilderType,
    handlePageClick: (pageName: string) => void,
    handlePageNameChange: (e: React.ChangeEvent<{value: string}>, pageName: string) => void},
                    ) {

    const classes=useStyles();

    return (
        // I used page name as the key but apparently it changes and in that case,
        // React will re-render everything since it cannot track it via its key.
        // Hence the TextField will lose focus.
        // So we use index to be the key to prevent re-render when the page name is changed.
        // see: https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character#:~:text=it%20is%20because%20you%20are,function%20into%20your%20render%20directly.
        <Paper  className={classes.menuButton}>
            <ListItem selected={props.pb.selected}>
                <RadioButtonUncheckedIcon onClick={() => props.handlePageClick(props.pb.name)} />
                <TextField value={props.pb.name} onChange={(e) => props.handlePageNameChange(e, props.pb.name)}
                />
            </ListItem>
        </Paper>
    )
}

export default function Sidebar(props: {
    pageBuilders: any[], onPageClick: (pageName: string) => void, addPageBuilder: (pageName: string) => void,
    removePageBuilder: () => void,
    handlePageNameChange: (oldName: string, newName: string) => void,
}) {

    const classes = useStyles();

    const handleButtonClick = (e: React.MouseEvent, action: string) => {
        if (action.includes("Add")) props.addPageBuilder("Page " + (props.pageBuilders.length + 1).toString());
        if (action.includes("Delete")) props.removePageBuilder();
    };

    const handlePageClick = (pageName: string) => {
        props.onPageClick(pageName);
    }

    const handlePageNameChange = (e: React.ChangeEvent<{value: string}>, oldName: string) => {
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

    const pages = props.pageBuilders.map((pb, index) => <PageButton key={index}
                                                                    pb={pb}
                                                                    handlePageNameChange={handlePageNameChange}
                                                                    handlePageClick={handlePageClick}
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