import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import Button from "../../components/Buttons/Button";
import { useCookies } from 'react-cookie';
import axios from "axios";

import Topic from "../../components/Topic";
import TypeOfWaste from "../../components/TypeOfWaste";
import InputText from "../../components/InputText";
import ChooseTypeOfWaste from "../../components/ChooseTypeOfWaste";
import { object } from "webidl-conversions";

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
function Profile(props) {
    const classes = useStyles();
    const [cookies] = useCookies();

    const [aboutText, setAboutText] = useState("")
    const [newAboutText, setNewAboutText] = useState("");
    const [editAboutText, setEditAboutText] = useState(false);
    const [types, setTypes] = useState([{
        id: 2,
        code: 'PE-HD-2',
        name: 'Полиэтилен высокой плотности'
      }]);
    const [newTypes, setNewTypes] = useState([]);
    const [editTypes, setEditTypes] = useState([]);

    const [name, setName] = useState("");
    const [rating, setRating] = useState("");

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
        if (props.location.state) {
            axios.get("/api/organizations/me/" + props.location.state.id, {
                headers: {
                    Authorization: 'Bearer' + cookies.access_token,
                }
            })
            .then(res => {
                setName(res.name);
                setTelNumber(res.phone_number);
                setHouse(res.address.house);
                setStreet(res.address.street);
                setOffice(res.address.office);
                setAboutText(res.description);
                setTypes(res.garbage_types);
                setRating(res.rating);
            })
        } else {
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
        }


        
    }, []);

    useEffect(() => {
        let temp = editTypes.slice();
        types.forEach((type) => {
            let t = allTypes.find((i) => {
                return i.id === type.id
            })

            if (t) temp.push(type);
        })
        
        setEditTypes(temp);
        
    }, [types]);

    console.log(editTypes)

    const allTypes = [{
        id: 1,
        code: 'PET-1',
        name: 'Полиэтилентерефталат'
      },{
        id: 2,
        code: 'PE-HD-2',
        name: 'Полиэтилен высокой плотности'
      },{
        id: 3,
        code: 'PVC-3',
        name: 'Поливинилхлорид'
      },{
        id: 4,
        code: 'PE-LD-4',
        name: 'Полиэтилен низкой плотности'
      },{
        id: 5,
        code: 'PP-5',
        name: 'Полипропилен'
      },{
        id: 6,
        code: 'PS-6',
        name: 'Полистирол'
      },{
        id: 7,
        code: 'O-7',
        name: 'Прочие пластмассы'
      }, {
        id: 8,
        code: 'ABS',
        name: 'Акрилонитрилбутадиенстирол'
      },{
        id: 9,
        code: 'PAP-20',
        name: 'Гофрокартон'
      },{
        id: 10,
        code: 'PAP-21 ',
        name: 'Картон'
      }, {
        id: 11,
        code: 'PAP-22',
        name: 'Бумага'
      },{
        id: 12,
        code: 'FE-40',
        name: 'Сталь'
      },{
        id: 13,
        code: 'ALU-41',
        name: 'Алюминий'
      },{
        id: 14,
        code: 'FOR-50',
        name: 'Древесина'
      },{
        id: 15,
        code: 'FOR-51',
        name: 'Пробка'
      },{
        id: 16,
        code: 'TEX-60',
        name: 'Одежда'
      }, {
        id: 17,
        code: 'TEX-61',
        name: 'Джут'
      }, {
        id: 18,
        code: 'GL-70',
        name: 'Стекло'
      }, {
        id: 19,
        code: 'PapPet-81',
        name: ' Комбинированные материалы'
      },{
        id: 20,
        code: 'C/PAP-84',
        name: 'Комбинированные материалы'
      }];

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
        let temp = editTypes.slice();
        temp.push(type);
        setEditTypes(temp);
    }

    const onUnChoose = (type) => {
        let temp = editTypes.slice();
        let index = temp.indexOf(type);
        temp.splice(index, 1);
        setEditTypes(temp);
    }

    return(
        <div className={classes.profile}>
            <Topic text="ОРГАНИЗАЦИЯ" />
            
            <div className={classes.header}>
                <img className={classes.logo} src="./logo.png" alt="logo" />
                <div className={classes.title}>
                    <span className={classes.titleText}>{name ? name : "Экоменеджмент"}</span>
                    <span className={classes.rating}>
                        <img className={classes.star} src="./star.svg" alt="star" />
                        {rating ? rating : 4.7}
                    </span>
                </div>
            </div>

            <hr className={classes.grayLine} />

            <div className={classes.container}>
                <div className={classes.description}>
                    <div className={classes.about}>
                        <div className={classes.title2}>
                            <span className={classes.titleText2}>О компании</span>
                                {!props.location.state 
                                    ? <div className={classes.editButtons}>
                                        <Button text="Сохранить" style={{padding: "10px 10px"}} onClick={() => {setEditAboutText(false); setAboutText(newAboutText)}} />
                                        <Button text="Отмена" style={{padding: "10px 10px"}} onClick={() => {setEditAboutText(false); setNewAboutText(aboutText)}} />
                                      </div>
                                    : null}
                            
                            
                        </div>

                        <div className={classes.descriptionAbout}>
                            {!props.location.state 
                                ? <InputText onChange={(v) => setNewAboutText(v)} init={aboutText} type="textarea" />
                                : aboutText}
                        </div>
                    </div>

                    <br />

                    <div className={classes.types}>
                        <div className={classes.title2}>
                            <span className={classes.titleText2}>Типы перерабатывающих отходов</span>
                            <div className={classes.link}>
                                {!props.location.state
                                    ? <div className={classes.editButtons}>
                                        <Button text="Сохранить" style={{padding: "10px 10px"}} onClick={() => {saveOption("garbage_type_ids", editTypes.map(t => t.id))}} />
                                        <Button text="Отмена" style={{padding: "10px 10px"}} onClick={() => setEditTypes(false)} />
                                      </div>
                                    : null}
                            </div>
                        </div>

                        <div className={classes.typesContainer}>
                            {props.location.state
                                ? types.map(type => <TypeOfWaste text={type.name} color="#24C2F4" />)

                                : allTypes.map(type => {
                                    return <ChooseTypeOfWaste onChoose={(v) => onChoose(v)}
                                                              onUnChoose ={(v) => onUnChoose(v)}
                                                              type={type}
                                                              alreadyChoosed={types.find(t => {
                                                                if (t.id === type.id) {
                                                                    
                                                                    return true
                                                                }
                                                              })}>
                                                <TypeOfWaste text={type.name} color="#24C2F4" />
                                            </ChooseTypeOfWaste>
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className={classes.description} style={{paddingLeft: 20}}>
                    <div className={classes.info}>
                        {!props.location.state
                            ? [<InputText label="Логин" init={login} onChange={(v) => setEditLogin(v)} onSubmit={() => {saveOption("login", editLogin)}} onClose={() => {setEditLogin(false)}} />,
                            <InputText label="Дом" init={house} onChange={(v) => setEditHouse(v)} onSubmit={() => {saveOption2("address", "house", editHouse)}} onClose={() => {setEditHouse(false)}} />,
                            <InputText label="Улица" init={street} onChange={(v) => setEditStreet(v)} onSubmit={() => {saveOption2("address", "street", editStreet)}} onClose={() => {setEditStreet(false)}} />,
                            <InputText label="Офис" init={office} onChange={(v) => setEditOffice(v)} onSubmit={() => {saveOption2("address", "office", editOffice)}} onClose={() => {setEditOffice(false)}} />,
                            <InputText label="Телефон" init={telNumber} onChange={(v) => setEditTelNumber(v)} onSubmit={() => {saveOption("phone_number", editTelNumber)}} onClose={() => {setEditTelNumber(false)}} />]
                            : [<InputText label="Логин" init={login} onChange={(v) => setEditLogin(v)} onSubmit={() => {saveOption("login", editLogin)}} onClose={() => {setEditLogin(false)}} />,
                            <span>Дом: {house}</span>,
                            <span>Улица: {street}</span>,
                            <span>Офис: {office}</span>,
                            <span>Телефон: {telNumber}</span>]
                        }
                        
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;