import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useSelector} from "react-redux";
import store, {RootState, toggleHelp} from "./Store";


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        outline: 0,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        }
    }),
);

export default function SimpleModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const modalOpen: boolean = useSelector((state: RootState) => state.helpModal)
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Help</h2>
            <p id="simple-modal-description">
                Helpful text
            </p>
        </div>
    );

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={() => store.dispatch(toggleHelp())}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
