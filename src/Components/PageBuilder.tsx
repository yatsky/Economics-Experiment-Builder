import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageElement from './PageElement';
import MyToolbar from './MyToolbar';
import AppBar from '@material-ui/core/AppBar';
import {HandleValChangePbPeFuncType, PageBuilderType} from './Types';
import {Box} from "@material-ui/core";
import useStyles from "./Styles";

export default function PageBuilder(props: {
    pageBuilder: PageBuilderType, handleValChange: HandleValChangePbPeFuncType,
}) {
    const classes = useStyles();

    let pes = props.pageBuilder.data.map((data, idx) => {
        return (
            <PageElement
                key={idx}
                data={data}
                handleValChange={(val, dataField) => props.handleValChange(idx, val, dataField)}
            />
        )
    })

    return (
        <Box>
            <AppBar position="sticky">
                <MyToolbar />
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {pes}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}