import React from "react";
import { createUseStyles } from 'react-jss';

import TypeOfWaste from "../../components/TypeOfWaste";

const useStyles = createUseStyles({
    table: {
        width: "100%",
        position: "relative",
    },
    header: {
        marginBottom: 5,
    },
    greenLine: {
        position: "absolute",
        width: "100%",
        border: "1px solid #25BA00",
    },
    cellOfTypes: {
        display: "flex",
        margin: "0 auto",
        width: "max-content",
        gap: 10,
    },
});

const typeColors = {
    "Стекло": "#24C2F4",
    "Пластик": "#F4B924",
    "Металл": "#7776C4",
    "ПВХ": "#C4768D",
    "Картон и бумага": "#B557C7",
}

const Table = React.memo(({ columns }) => {
    const classes = useStyles();

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.header}>
                    {columns.map((col) => <th>{col.title}</th>)}
                    
                </tr>
            </thead>
            <hr className={classes.greenLine} />

            <tbody>
                <br />            
                {
                    [
                        {number: 1, name: "Экоменеджмент", types: ["Стекло", "Пластик"], rating: 4.7},
                        {number: 2, name: "Экоменеджмент", types: ["Картон и бумага", "Металл", "Пластик"], rating: 3.7}
                    ]
                    .map((row) => <tr className={classes.row}>
                                    {columns.map((col) => <th key={col}>
                                        <div className={col.name === "types" ? classes.cellOfTypes : null}>
                                            {
                                                (col.name === "types"
                                                    ? row[col.name].map((type) => <TypeOfWaste text={type} color={typeColors[type] || "#24C2F4"} size="small" />)
                                                    : row[col.name])
                                            }
                                        </div>
                                    </th> )}
                                  </tr>)
                }
            </tbody>

            
        </table>
    );
})

export default Table;