import React, { useState } from "react";
import { createUseStyles } from 'react-jss';

import Button from "../../components/Buttons/Button";

const useStyles = createUseStyles({
    inputChoose: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    label: {
        fontSize: 14,
    },
});

const InputChoose = React.memo(({ label, children }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={classes.inputChoose}>
            <label className={classes.label}>{label}</label>
            {isOpen 
                ? <Button text="Указать" onClick={() => setIsOpen(false)} />
                : children}
        </div>
    );
})

export default InputChoose;