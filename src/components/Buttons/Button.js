import React, { useState } from "react";
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    button: {
        display: "flex",
        lineHeight: 0,
        alignItems: "center",
        padding: "15px 40px",
        color: "#25BA00",
        border: "1px solid #25BA00",
        borderRadius: 7,
        width: "max-content",

        "&:hover": {
            cursor: "pointer",
        }
    },
});

const Button = React.memo(({ text, onClick, style }) => {
    const classes = useStyles();

    return (
        <div onClick={onClick} className={classes.button} style={style}>{text}</div>
    );
})

export default Button;