import React from 'react';
import Button from '@material-ui/core/Button';

export default function ToolbarButton(props: {
    icon: JSX.Element,
    buttonLabel: string,
    className: string,
    handleClick: () => void,
}) {
    return (
        <Button
            className={props.className}
            variant="contained"
            color="secondary"
            startIcon={props.icon}
            onClick={props.handleClick}
        >
            {props.buttonLabel}
        </Button>
    );
}