import React from "react";
import { Route } from "react-router-dom";
import { createUseStyles } from 'react-jss';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useCookies } from 'react-cookie';

import About from "./pages/About";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import Rating from "./pages/Rating";
import Registration from "./pages/Registration";

import "./fonts/gilroy.css";
import "./fonts/roboto.css";

const useStyles = createUseStyles({
  App: {
      height: "100%",
      width: "100%",
  },
  AppInner: {
    position: "relative",
    padding: "0 375px",
    height: "100%",
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
    const classes = useStyles();
    const [cookies] = useCookies();

    return (
        <div className={classes.App}>
            <div className={classes.AppInner}>
                <Header />
                <Route exact path="/" component={About} />
                {cookies.access_token ? <Route exact path="/profile" component={props => Profile(props)} /> : null}
                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/rating" component={Rating} />
                <Route exact path="/registration" component={Registration} />
            </div>
            <Footer />
        </div>
);
}

export default App;
