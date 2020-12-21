import React from 'react';
import AuthorizationPanel from "./components/AutorizationPanel/AuthorizationPanel";
import RegistrationPanel from "./components/RegistrationPanel/RegistrationPanel";
import {Router,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory} from "history";
const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
                <Route exact path='/' render={() => <AuthorizationPanel/>}/>
                <Route exact path='/registration' render={() => <RegistrationPanel/>}/>
        </Router>

    );
}

export default App;
