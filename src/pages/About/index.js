import React from "react";
import { createUseStyles } from 'react-jss';

import Topic from "../../components/Topic";

const useStyles = createUseStyles({
    about: {
    },
    h1: {
        textAlign: "center",
        color: "#25BA00",
        fontWeight: 300,
        fontSize: 72,
    },
    descriptionText: {
        padding: "0 5rem",
        fontSize: 24,
    },
    footer: {
        position: "relative",
        color: "#25BA00",
        fontSize: 36,
        fontWeight: 500,
        textAlign: "center",
        marginTop: "5rem",
    },
});

function About() {
    const classes = useStyles();

    return(
        <div className={classes.about}>
            <Topic text="О проекте" />

            <div className={classes.description}>
                <h1 className={classes.h1}>ECOPLACE</h1>

                <div className={classes.descriptionText}>
                Мы некоммерческая организация, занимающаяся разработкой удобного сервиса, помогающего людям правильно утилизировать свои отходы. Наш сервис состоит из мобильного приложения для рядовых пользователей и веб-клиента для организаций. 
    А попробуйте съесть еще этих мягких французских булок да выпить нашего чаю. Также хотим отметить, что наш сервис скоро обзаведется версией на английском языке, поэтому можем с удовольствием сказать, что Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </div>

                <div className={classes.footer}>
                    С помощью нас вы сможете сделать мир чище!
                </div>
            </div>


        </div>
    );
}

export default About;