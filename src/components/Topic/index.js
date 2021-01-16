import React, { useState} from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    topic: {
        boxSizing: "border-box",
        position: "relative",
        width: "100%",
        minHeight: 40,
        height: "5rem", 
        backgroundColor: "#25BA00",
        fontSize: 24,
        paddingLeft: 20,
    },
    text: {
        position: "absolute",
        color: "white",
        bottom: 15,
    },
});

const Topic = React.memo(({ text }) => {
    const classes = useStyles();

    return (
        <div className={classes.topic}>
            <span className={classes.text}>{text}</span>
        </div>
    );
})

export default Topic;