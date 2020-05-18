import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[])

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {/* {<div class="topnav">
          <h1>Welcome to the Bubble App!</h1>
          {!loggedIn?<NavLink to="/" class="active">Bubble App</NavLink>:<NavLink to="/bubbles" class="active">Bubble App</NavLink>}
          <div className="myLinks hidden" id="myLinks">
            {loggedIn?<Link to="/logout">Logout</Link>:<Link to="/login">Login</Link>}
          </div>
        </div>} */}
        <Switch>
          <PrivateRoute exact path="/bubbles" component={BubblePage} />
          <Route path="/login" render={(props)=> <Login {...props} func={login} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          {!loggedIn?<Route render={(props)=> <Login {...props} func={login} />}/>:<PrivateRoute component={BubblePage} />}
        </Switch>
        {/*
          Build a PrivateRoute component that will
          display BubblePage when you're authenticated
        */}
      </div>
    </Router>
  );
}

export default App;
