import React, { useState} from "react";
import { createUseStyles } from 'react-jss';

import Button from "../../components/Buttons/Button";

const useStyles = createUseStyles({
    inputText: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    label: {
        fontSize: 14,
    },
    input: {
        boxSizing: "border-box",
        padding: 9,
        width: "100%",
        border: "1px solid #C4C4C4",
        borderRadius: 8,
    },
    header: {
        display: "flex",
        gap: 20,
    },
});

const InputText = React.memo(({ onChange, label, type, init, onSubmit, onClose }) => {
    const classes = useStyles();
    const [value, setValue] = useState(init);

    return (
        <div className={classes.inputText}>
            <div className={classes.header}>
                <label className={classes.label} >{label}</label>
                {onSubmit && <Button text="Сохранить" onClick={onSubmit} style={{padding: "10px 10px"}} />}
                {onClose && <Button text="Отмена" onClick={onClose} style={{padding: "10px 10px"}} />}
            </div>
            {type === "textarea"
                ? <textarea rows="10" className={classes.input} value={value} onChange={(event) => {onChange(event.target.value); setValue(event.target.value)}} ></textarea>
                : <input className={classes.input} value={value} onChange={(event) => {onChange(event.target.value); setValue(event.target.value)}}/>}
        </div>
    );
})

export default InputText;