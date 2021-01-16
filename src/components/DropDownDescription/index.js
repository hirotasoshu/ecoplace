import React, { useState } from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    dropDownDescription: {
        width: "100%",
        position: "relative",
    },
    header: {
        boxSizing: "border-box",
        width: "100%",
        position: "relative",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 18,
        fontWeight: 400,

        "&:hover": {
            cursor: "pointer",
        },
    },
    arrow: {
        height: "1rem",
        position: "relative",
    },
    
    grayLine: {
        border: "1px solid #E3E3E3",
    },
});

const DropDownDescription = React.memo(({ text, children }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classes.dropDownDescription}>
            <div onClick={() => {setIsOpen(!isOpen)}} className={classes.header}
                 onBlur={() => {setIsOpen(false)}}>
                {text}
                <img className={classes.arrow} src="./arrowDown.svg" alt="arrowdown" />
            </div>

            {isOpen ? children : null}    
            
            <hr className={classes.grayLine}/>
        </div>
    );
})

export default DropDownDescription;