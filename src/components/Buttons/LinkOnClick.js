import React, { useState} from "react";
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    link: {
        backgroundColor: "white",
        border: 0,
        outline: 0,
        fontSize: 18,

        "&:hover": {
            cursor: "pointer",
        },
    },
});

const Link = React.memo(({ text, onClick }) => {
    const classes = useStyles();
    
    return (
        <div onClick={onClick} className={classes.link}>{text}</div>
    );
})

export default Link;