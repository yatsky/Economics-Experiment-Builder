import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PageBuilder from './PageBuilder';
import Sidebar from './Sidebar';
import {drawerWidth, HandleValChangeFuncType, PageBuilderType, PageElementDataType, VariableType} from './Config';


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
            data: [
                {
                    pageElementId: 1,
                    varType: VariableType.IntegerVariable,
                    varName: "",
                    varLabel: "",
                    varInitial: "",
                    varOwner: "Subsession",
                    varMin: 0,
                    varMax: 0,
                    varText: "",
                }],
        },
    ]);

    // Used by each Field in PageElement.
    const handleValChange: HandleValChangeFuncType = (pageElementId,val, dataField, pageName) => {
        console.log(pageBuilders);
        console.log(pageName);
        let pbs = pageBuilders.slice().map(pb => {
            if (pb.name.includes(pageName)) {
                pb.data[pageElementId][dataField] = val;
                console.log(pb.data[pageElementId].varType);
            }
            return pb;
        });

        setPageBuilders(pbs);
    };

    // Toolbar click
    const handleToolbarBtnClick: (pageName: string, btnName: string) => void = (pageName, btnName) => {
        let pbs = pageBuilders.slice();
        let pb = pbs.filter(pb => pb.selected)[0];

        if(btnName.includes("Add")){
            pb.data.push(
                {
                    pageElementId: pb.data.length,
                    varType: VariableType.IntegerVariable,
                    varName: "",
                    varLabel: "",
                    varInitial: "",
                    varOwner: "Subsession",
                    varMin: 0,
                    varMax: 0,
                    varText: "",
                },
            );
        }
        else{
            pb.data.pop();
        }

        setPageBuilders(pbs);
    };

    const addPageBuilder = (pageName: string) => {
        let pbs = pageBuilders.slice();
        pbs.push(
            {
                name: pageName,
                selected: false,
                data: [{
                    pageElementId: 1,
                    varType: VariableType.IntegerVariable,
                    varName: "",
                    varLabel: "",
                    varInitial: "",
                    varOwner: "Subsession",
                    varMin: 0,
                    varMax: 0,
                    varText: "",
                }],
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

    let curPb = pageBuilders.filter(obj => obj.selected)[0];
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
                        pageBuilder={curPb}
                        handleValChange={(pageElementId, val, dataField) => handleValChange(pageElementId, val, dataField, curPb.name)}
                        handleToolbarBtnClick={(btnName) => handleToolbarBtnClick(curPb.name, btnName)}
                    />
                </Container>
            </main>
        </div>
    );
}
