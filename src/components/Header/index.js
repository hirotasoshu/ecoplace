import React, { useState } from "react";
import { createUseStyles } from 'react-jss';
import axios from "axios";
import { useCookies } from 'react-cookie';

import Link from "../Buttons/Link";
import LinkOnClick from "../Buttons/LinkOnClick";
import DropDownDescription from "../../components/DropDownDescription";
import Authorize from "../../components/Authorize";


const useStyles = createUseStyles({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0",
    },
    logoText: {
        fontFamily: "Gilroy",
        color: "#25BA00",
        fontSize: 20,
        fontWeight: "500",
    },
    navigation: {
        display: "flex",
        gap: "2rem",
        justifyContent: "space-between",
    },
    dropMenu: {
        right: 0,
        zIndex: 99,
        padding: 10,
        borderRadius: 7,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        backgroundColor: "white",
    },
    greenLine: {
        border: "1px solid #25BA00",
        width: "100%",
    },
});

function Header() {
    const classes = useStyles();
    const [cookies] = useCookies();


    return (
        <div className={classes.header}>
            <span className={classes.logoText}>ECOPLACE</span>
            
            <div className={classes.navigation}>
                <Link text="Профиль" to="/profile" />
                <Link text="Рейтинг" to="/rating" />
                <Link text="FAQ" to="/faq" />
                <Link text="О проекте" to="/" />
            </div>

            <div>
                { cookies.access_token 
                    ?   <DropDownDescription text="youremailhere@mail.com" >
                            <div className={classes.dropMenu}>
                                <Link text="Профиль" to="/profile" />
                                <hr className={classes.greenLine} />
                                <LinkOnClick text="Выход" onClick={() => console.log("Выход")} />
                            </div>
                        </DropDownDescription>
                    
                    :   <DropDownDescription text="youremailhere@mail.com" >
                            <Authorize />
                        </DropDownDescription>

                }
            </div>

        </div>
    );
}

export default Header;