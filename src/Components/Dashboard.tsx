import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PageBuilder from './PageBuilder';
import Sidebar from './Sidebar';
import {HandleValChangeFuncType, PageBuilderType, VariableType, WidgetType} from './Types';
import SimpleModal from "./SimpleModal";
import useStyles from "./Styles";
import {useSelector} from "react-redux";
import {RootState} from "./Store";


export default function Dashboard() {
    const classes = useStyles();

    const pageBuilders: PageBuilderType[] = useSelector((state: RootState) => state.pageBuilders)

    // Used by each Field in PageElement.
    const handleValChange: HandleValChangeFuncType = (pageElementId, val, dataField, pageName) => {
        console.log(pageBuilders);
        console.log(pageName);
        let pbs = pageBuilders.slice().map(pb => {
            if (pb.name.includes(pageName)) {
                pb.data[pageElementId][dataField] = val;
                console.log(pb.data[pageElementId].varType);
            }
            return pb;
        });

        //setPageBuilders(pbs);
    };

    const savePageNameChange: (idx: number, newName: string) => boolean = (idx, newName) => {
        let pbs = pageBuilders.slice();

        // check if newName exists already
        // skip checking for pb itself
        if (pbs.filter((pb, index) => pb.name === newName && index !== idx).length > 0) return false;

        let pb = pbs.filter((pb, index) => index === idx)[0];
        pb.name = newName;
        // setPageBuilders(pbs);
        return true
    };

    const handlePageNameChange: (oldName: string, newName: string) => void = (oldName, newName) => {
        let pbs = pageBuilders.slice();
        let pb = pbs.filter(pb => pb.name === oldName)[0];
        pb.name = newName;
        // setPageBuilders(pbs);
    };

    const handlePageBuilderSelect = (pageName: string) => {
        let newPBs = pageBuilders.slice().map(obj => {
            obj.name === pageName ? obj.selected = true : obj.selected = false;
            return obj;
        });
        // setPageBuilders(newPBs);
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

            <Sidebar />
            <main className={classes.content}>
                <Container maxWidth="lg">
                    <PageBuilder
                        pageBuilder={curPb}
                        handleValChange={(pageElementId, val, dataField) => handleValChange(pageElementId, val, dataField, curPb.name)}
                    />
                </Container>
            </main>
            <SimpleModal/>
        </div>
    );
}
