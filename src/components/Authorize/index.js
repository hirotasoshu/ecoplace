import React, { useState } from "react";
import { createUseStyles } from 'react-jss';
import InputText from "../../components/InputText";
import Button from "../../components/Buttons/Button";
import axios from "axios";
import { useCookies } from 'react-cookie';

const useStyles = createUseStyles({
    authorize: {
        position: "absolute",
        zIndex: 99,
        backgroundColor: "white",
        padding: "5px 10px",
        border: "1px solid black",
        borderRadius: 7,
    },
});

const Authorize = React.memo(() => {
    const classes = useStyles();
    const [cookies, setCookies] = useCookies();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const authorize = () => {
        let body = {
            username: login,
            password: password,
        };

        const data = new FormData();
        data.append("username", login)
        data.append("password", password)

        axios({
            method: "post",
            url: "/api/organizations/token",
            data: data,
        })
        .then(res => {
            setCookies("access_token", res.data.access_token);
            setCookies("token_type", res.data.token_type);
        })
        .catch(e => console.log(e))
    }; 

    return (
        <div className={classes.authorize}>
            <InputText onChange={v => setLogin(v)} label="Логин:"  />
            <InputText onChange={v => setPassword(v)} label="Пароль:"  />
            <Button text="Авторизоваться" onClick={authorize} style={{marginTop: 10}} />
        </div>
    );
})

export default Authorize;