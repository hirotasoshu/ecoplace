import React from "react";
import { createUseStyles } from 'react-jss';

import Topic from "../../components/Topic";
import Table from "../../components/Table";

const useStyles = createUseStyles({
    rating: {

    },
    tableContainer: {
        width: '100%',
    },
    
});

const tableColumns = [
    {name: "number", title: "Место"},
    {name: "name", title: "Название"},
    {name: "types", title: "Типы перерабатываемого мусора"},
    {name: "rating", title: "Рейтинг"},
]

function Rating() {
    const classes = useStyles();

    return (
        <div className={classes.rating}>
            <Topic text="РЕЙТИНГ ОРГАНИЗАЦИЙ" />
            
            <div className={classes.tableContainer}>
                <Table columns={tableColumns} />
            </div>

        </div>
    );
}

export default Rating;