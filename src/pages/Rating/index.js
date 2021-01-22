import React, { useEffect, useState } from "react";
import axios from "axios";
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

    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get("/api/organizations")
            .then(res => {
                setRows(res.data.map((data, index) => {
                    return {
                        number: index + 1,
                        name: data.name,
                        types: data.garbage_types.map(d => d.code),
                        rating: data.rating,
                        id: data.id,
                    }
                }))
            })
            .catch(e => console.log(e))
    }, []);

    return (
        <div className={classes.rating}>
            <Topic text="РЕЙТИНГ ОРГАНИЗАЦИЙ" />
            
            <div className={classes.tableContainer}>
                <Table columns={tableColumns} rows={rows} />
            </div>

        </div>
    );
}

export default Rating;