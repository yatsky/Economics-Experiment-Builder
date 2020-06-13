import React from 'react';
import Button from '@material-ui/core/Button';

export default function ToolbarButton(props: {icon: JSX.Element,
    buttonLabel: string,
className: string}) {
    return (
        <Button
        className={props.className}
        variant="contained"
        color="secondary"
        startIcon={props.icon}>
            {props.buttonLabel}
        </Button>
    );
}