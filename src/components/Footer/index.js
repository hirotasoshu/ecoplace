import React, { useState } from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        width: "100%",
        height: "max-content",
        position: "absolute",
        bottom: 0,
        textAlign: "center",
        backgroundColor: "#25BA00",
        padding: "5px 0",
        color: "white",
        fontSize: 18,
        fontWeight: 500,
    },
});

const Footer = React.memo(() => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            © 2020-2021, Ecoplace
        </div>
    );
})

export default Footer;