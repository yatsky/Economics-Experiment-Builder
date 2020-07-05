import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageElement from './PageElement';
import MyToolbar from './MyToolbar';
import AppBar from '@material-ui/core/AppBar';
import {HandleValChangePbPeFuncType, PageBuilderType} from './Types';
import {Box} from "@material-ui/core";

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
export default function PageBuilder(props: {
    pageBuilder: PageBuilderType, handleValChange: HandleValChangePbPeFuncType,
    handleToolbarBtnClick: (btnName: string) => void,
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
                <MyToolbar handleClick={props.handleToolbarBtnClick}/>
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