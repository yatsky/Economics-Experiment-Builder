import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const drawerWidth = 140;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
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
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(1),
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
        checkbox: {
            float: 'left',
        },
    }),
);


export default useStyles;
export {drawerWidth};