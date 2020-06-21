import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PageBuilder from './PageBuilder';
import Sidebar from './Sidebar';
import {drawerWidth, HandleValChangeFuncType, PageBuilderType, VariableType} from './Config';


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


export default function Dashboard() {
    const classes = useStyles();


    const [pageBuilders, setPageBuilders] = useState<PageBuilderType[]>([
        {
            name: "Page 1",
            selected: true,
            data: {
                varType: VariableType.IntegerVariable,
                varName: "",
                varLabel: "",
                varInitial: "",
                varOwner: "Subsession",
                varMin: 0,
                varMax: 0,
                varText: "",
            },
        },
    ]);

    // Used by each Field in PageElement.
    const handleValChange: HandleValChangeFuncType = (val, dataField, pageName) => {
        console.log(pageBuilders);
        console.log(pageName);
        let pbs = pageBuilders.slice().map(pb => {
            if (pb.name.includes(pageName)) {
                pb.data[dataField] = val;
                console.log(pb.data.varType);
            }
            return pb;
        });

        setPageBuilders(pbs);
    };

    const addPageBuilder = (pageName: string) => {
        let pbs = pageBuilders.slice();
        pbs.push(
            {
                name: pageName,
                selected: false,
                data: {
                    varType: VariableType.IntegerVariable,
                    varName: "",
                    varLabel: "",
                    varInitial: "",
                    varOwner: "Subsession",
                    varMin: 0,
                    varMax: 0,
                    varText: "",
                },
            }
        );
        setPageBuilders(pbs);
    }
    const removePageBuilder = () => {
        let pbs = pageBuilders.slice().filter(pb => !pb.selected);
        pbs[0].selected = true;
        setPageBuilders(pbs);
    }
    const handlePageBuilderSelect = (pageName: string) => {
        let newPBs = pageBuilders.slice().map(obj => {
            obj.name === pageName ? obj.selected = true : obj.selected = false;
            return obj;
        });
        setPageBuilders(newPBs);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography variant="h3" className={classes.title}>
                        Experiment builder
                    </Typography>
                </Toolbar>
            </AppBar>

            <Sidebar
                pageBuilders={pageBuilders}
                onPageClick={handlePageBuilderSelect}
                addPageBuilder={addPageBuilder}
                removePageBuilder={removePageBuilder}
            />
            <main className={classes.content}>
                <Container maxWidth="lg">
                    <PageBuilder
                        pageBuilder={pageBuilders.filter(obj => obj.selected)[0]}
                        handleValChange={(val, dataField) => handleValChange(val, dataField, pageBuilders.filter(obj => obj.selected)[0].name)}
                    />
                </Container>
            </main>
        </div>
    );
}
