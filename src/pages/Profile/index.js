import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import Button from "../../components/Buttons/Button";
import { useCookies } from 'react-cookie';
import axios from "axios";

import Topic from "../../components/Topic";
import TypeOfWaste from "../../components/TypeOfWaste";
import InputText from "../../components/InputText";
import ChooseTypeOfWaste from "../../components/ChooseTypeOfWaste";

const useStyles = createUseStyles({
    profile: {

    },
    header: {
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    logo: {
        height: 150,
    },
    title: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    titleText: {
        fontSize: 36,
        fontWeight: 500,
        lineHeight: 1,
    },
    rating: {
        fontSize: 24,
        fontWeight: 500,
        display: "flex",
        gap: 10,
        alignItems: "center",
    },
    star: {
        height: 30,
    },
    grayLine: {
        border: "1px solid #C4C4C4",
    },
    description: {
        width: "50%",
    },
    title2: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontSize: 24,
        fontWeight: 500,
    },
    titleText2: {
        paddingBottom: 5,
    },
    link: {
        color: "#25BA00",
        fontSize: 14,
        fontWeight: 400,

        "&:hover": {
            cursor: "pointer",
        }
    },
    descriptionAbout: {
        fontSize: 14,
        fontWeight: 400,
    },
    types: {
        
    },
    typesContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        marginBottom: 20, // asd
    },
    textareaEdit: {
        minWidth: 500,
        minHeight: 100,
    },
    editButtons: {
        display: "flex",
        fontSize: 14,
        gap: 20,
    },
    container: {
        display: "flex",
    },
    info: {
        gap: 20,
        display: "flex",
        flexDirection: "column",
    },
});
function Profile() {
    const classes = useStyles();
    const [cookies] = useCookies();

    const [aboutText, setAboutText] = useState("")
    const [newAboutText, setNewAboutText] = useState("");
    const [editAboutText, setEditAboutText] = useState(false);
    const [types, setTypes] = useState([]);
    const [newTypes, setNewTypes] = useState([]);
    const [editTypes, setEditTypes] = useState(false);

    const [login, setLogin] = useState("");
    const [editLogin, setEditLogin] = useState(false);

    const [house, setHouse] = useState("");
    const [editHouse, setEditHouse] = useState(false);

    const [street, setStreet] = useState("");
    const [editStreet, setEditStreet] = useState(false);

    const [office, setOffice] = useState("");
    const [editOffice, setEditOffice] = useState(false);

    const [telNumber, setTelNumber] = useState("");
    const [editTelNumber, setEditTelNumber] = useState(false);

    useEffect(() => {
        axios.get("/api/organizations/me", {
            headers: {
                Authorization: 'Bearer' + cookies.access_token,
            }
        })
        .then(res => {
            setLogin(res.login);
            setHouse(res.address.house);
            setStreet(res.address.street);
            setOffice(res.address.office);
            setTelNumber(res.phone_number);
            setAboutText(res.description);
            setTypes(res.garbage_types);
        })
    }, []);

    const saveOption = (fieldName, value) => {
        axios.patch("/api/organizations/me", {
            [fieldName]: value, 
        }, {
            headers: {
                Authorization: "Bearer" + cookies.access_token,
            }
        })
    };

    const saveOption2 = (fieldName1, fieldName2, value) => {
        axios.patch("/api/organizations/me", {
            [fieldName1]: {
                [fieldName2] : value,
            },
        }, {
            headers: {
                Authorization: "Bearer" + cookies.access_token,
            }
        })
    };

    const onChoose = (type) => {
        let temp = types.slice();
        temp.push(type);
        setTypes(temp);
    }

    const onUnChoose = (type) => {
        let temp = types.slice();
        let index = temp.indexOf(type);
        temp.splice(index, 1);
        setTypes(temp);
    }

    return(
        <div className={classes.profile}>
            <Topic text="ОРГАНИЗАЦИЯ" />
            
            <div className={classes.header}>
                <img className={classes.logo} src="./logo.png" alt="logo" />
                <div className={classes.title}>
                    <span className={classes.titleText}>Экоменеджмент</span>
                    <span className={classes.rating}>
                        <img className={classes.star} src="./star.svg" alt="star" />
                        4.7
                    </span>
                </div>
            </div>

            <hr className={classes.grayLine} />

            <div className={classes.container}>
                <div className={classes.description}>
                    <div className={classes.about}>
                        <div className={classes.title2}>
                            <span className={classes.titleText2}>О компании</span>
                                {true
                                    ? <div className={classes.editButtons}>
                                        <Button text="Сохранить" style={{padding: "10px 10px"}} onClick={() => {setEditAboutText(false); setAboutText(newAboutText)}} />
                                        <Button text="Отмена" style={{padding: "10px 10px"}} onClick={() => {setEditAboutText(false); setNewAboutText(aboutText)}} />
                                      </div>
                                    : <span onClick={() => setEditAboutText(true)} className={classes.link}>Редактировать</span>}
                            
                            
                        </div>

                        <div className={classes.descriptionAbout}>
                            {true 
                                ? <InputText onChange={(v) => setNewAboutText(v)} init={aboutText} type="textarea" />
                                : aboutText}
                        </div>
                    </div>

                    <br />

                    <div className={classes.types}>
                        <div className={classes.title2}>
                            <span className={classes.titleText2}>Типы перерабатывающих отходов</span>
                            <div className={classes.link}>
                                {editTypes
                                    ? <div className={classes.editButtons}>
                                        <Button text="Сохранить" style={{padding: "10px 10px"}} onClick={() => {setEditTypes(false)}} />
                                        <Button text="Отмена" style={{padding: "10px 10px"}} onClick={() => setEditTypes(false)} />
                                      </div>
                                    : <span onClick={() => setEditTypes(true)} className={classes.link}>Редактировать</span>}
                            </div>
                        </div>

                        <div className={classes.typesContainer}>
                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="Стекло"
                                               alreadyChoosed>
                            <TypeOfWaste text="Стекло" color="#24C2F4" />
                            </ChooseTypeOfWaste>
                                    
                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="Пластик"
                                               alreadyChoosed>
                            <TypeOfWaste text="Пластик" color="#F4B924" />
                            </ChooseTypeOfWaste>

                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="Металл"
                                               alreadyChoosed>
                            <TypeOfWaste text="Металл" color="#7776C4" />
                            </ChooseTypeOfWaste>

                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="ПВХ"
                                               alreadyChoosed>
                            <TypeOfWaste text="ПВХ" color="#C4768D" />
                            </ChooseTypeOfWaste>

                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="Картон и бумага"
                                               alreadyChoosed>
                            <TypeOfWaste text="Картон и бумага" color="#B557C7" />
                            </ChooseTypeOfWaste>

                            <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                               onUnChoose ={(v) => onUnChoose(v)}
                                               type="Картон и бумага"
                                               alreadyChoosed>
                            <TypeOfWaste text="Картон и бумага" color="#76C47E" />
                            </ChooseTypeOfWaste>

                        </div>
                    </div>
                </div>

                <div className={classes.description} style={{paddingLeft: 20}}>
                    <div className={classes.info}>
                        <InputText label="Логин" init={login} onChange={(v) => setEditLogin(v)} onSubmit={() => {saveOption("login", editLogin)}} onClose={() => {setEditLogin(false)}} />

                        <InputText label="Дом" init={house} onChange={(v) => setEditHouse(v)} onSubmit={() => {saveOption2("address", "house", editHouse)}} onClose={() => {setEditHouse(false)}} />

                        <InputText label="Улица" init={street} onChange={(v) => setEditStreet(v)} onSubmit={() => {saveOption2("address", "street", editStreet)}} onClose={() => {setEditStreet(false)}} />

                        <InputText label="Офис" init={office} onChange={(v) => setEditOffice(v)} onSubmit={() => {saveOption2("address", "office", editOffice)}} onClose={() => {setEditOffice(false)}} />

                        <InputText label="Телефон" init={telNumber} onChange={(v) => setEditTelNumber(v)} onSubmit={() => {saveOption("phone_number", editTelNumber)}} onClose={() => {setEditTelNumber(false)}} />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;