import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PageBuilder from './PageBuilder';
import Sidebar from './Sidebar';
import {PageBuilderType} from './Types';
import SimpleModal from "./SimpleModal";
import useStyles from "./Styles";
import {useSelector} from "react-redux";
import {RootState} from "./Store";


export default function Dashboard() {
    const classes = useStyles();

    const pageBuilders: PageBuilderType[] = useSelector((state: RootState) => state.pageBuilders)

    // Used by each Field in PageElement.

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

            <Sidebar/>
            <main className={classes.content}>
                <Container maxWidth="lg">
                    <PageBuilder
                        pageBuilder={curPb}
                    />
                </Container>
            </main>
            <SimpleModal/>
        </div>
    );
}
