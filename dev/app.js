import React from 'react';
import {render} from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import LoginStore from "./Components/Mobx/LoginStore";

import Navbar from './components/navbar';
import EcmrReader from './containers/ecmr_reader';
import Current from './components/current';
import Login from './components/login';
import Dashboard from './components/dashboard';

const Main = () => (
    <div className="content container">
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/finished' component={EcmrReader}/>
            <Route exact path='/current' component={Current}/>
        </Switch>
    </div>
)

const App = function () {
    return (
        <div className="fill">
            <Navbar/>
            <Main />
        </div>
    );
};

const stores = {
    LoginStore
};

render(
    <Provider {...stores}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    ,
    document.querySelector("#container")

);