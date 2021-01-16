import React, { useState} from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    typeOfWaste: {
        padding: "6px 12px",
        borderRadius: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: 500,
        color: "white",
        textAlign: "center",
    },
});

const TypeOfWaste = React.memo(({ text, color, size }) => {
    const classes = useStyles();

    return (
        <div className={classes.typeOfWaste} style={{backgroundColor: color}}>
            <span className={classes.text} >
                      {size === "small" ? text[0] : text}
            </span>
        </div>
    );
})

export default TypeOfWaste;