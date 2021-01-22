import React, { useState} from "react";
import { createUseStyles } from 'react-jss';

import { Redirect } from "react-router-dom";

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

const Link = React.memo(({ text, to, data }) => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);
    
    if (redirect) return <Redirect to={{
        pathname: to,
        state: data,
    }} />;

    return (
        <div onClick={() => {
            setRedirect(true);
            
            setTimeout(() => {
                setRedirect(false)
            }, 1);
        }} className={classes.link}>{text}</div>
    );
})

export default Link;