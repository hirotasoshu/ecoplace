import React, { useState } from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    body: {
        "&:hover": {
            cursor: "pointer",
        }
    },
});

const ChooseTypeOfWaste = React.memo(({ type, onChoose, onUnChoose, children, alreadyChoosed }) => {
    const classes = useStyles();
    const [choosed, setChoosed] = useState(alreadyChoosed);

    return (
        <div className={classes.body} style={{opacity: choosed ? 1 : 0.2}}
             onClick={() => {
                if (choosed) onUnChoose(type)
                else onChoose(type);
                setChoosed(!choosed);
             }}>
            {children}
        </div>
    );
})

export default ChooseTypeOfWaste;