import React, { ReactPropTypes } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PropTypes } from '@material-ui/core';
import PageElement from './PageElement';
import MyToolbar from './MyToolbar';
import AppBar from '@material-ui/core/AppBar';
import {PageBuilderType, VariableType} from './Config';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
export default function PageBuilder(props: {pageBuilder: PageBuilderType, handleValChange: (selectedVarType: VariableType) => void}) {
    const classes = useStyles();
    return (
        <Box border={1}>
            <AppBar position="sticky">
                <MyToolbar />
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <PageElement pageBuilder={props.pageBuilder} handleValChange={props.handleValChange} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}