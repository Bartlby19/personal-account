import React from 'react';
import AuthorizationPanel from "./components/AutorizationPanel/AuthorizationPanel";
import RegistrationPanel from "./components/ RegistrationPanel/RegistrationPanel";
import {Route, Router} from 'react-router-dom';
import AddressList from "./components/AddressList/AddressList";
import Popup from "./components/PopUp/PopUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusRegistration: "",
            personAuthorizationInfo: "",
            errorAuthorization: "",
            showForm: true,
            idChangUser: ""
        }
    };

    async componentDidMount() {
        try {
            let promise = await this.sendRequest(null, 'main/checkSession', 'GET');
            if (promise.length > 0) {
                this.setState({personAuthorizationInfo: promise}, () => {
                    history.push('/addressList')
                })
            } else {
                history.push('/')
            }
        } catch (err) {
            history.push('/')
        }
    }

    sendRequest = async (data, url, method) => {
        let obj = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (data) {
            obj.body = JSON.stringify(data)
        }
        let response = await fetch(url, obj);

        if (!response.ok) {
            this.setState({error: !this.state.error, errorResponse: response});
            return
        }
        return await response.json();

    };

    async generateRequest(data, url, method) {
        let response = await this.sendRequest(data, url, method)
        if (response.length > 0) {
            this.setState({"personAuthorizationInfo": response})
            history.push('/addressList')
            return
        }
        this.setState({"errorAuthorization": response})
    }

    closeRegistrationPopup() {
        this.setState({"statusRegistration": ""})
    }

    openChangeForm(userId) {
        this.setState({"showForm": false, "idChangUser": userId})
    }

    closeAuthorizationPopup() {
        this.setState({"errorAuthorization": ""})
    }

    async sendingUserRegistrationInformation(userInfo) {
        const url = "main/registration";
        let responseStatus = await this.sendRequest(userInfo, url, "POST")
        this.setState({"statusRegistration": responseStatus})
    }


    async sendSearchInfo(searchInfo) {
        const url = "main/search";
        let response = await this.sendRequest(searchInfo, url, "POST")
            this.setState({"personAuthorizationInfo": response}, () => history.push('/addressList'))
    }

    async sendDeleteInfo(deleteInfo) {
        const url = "main/delete";
        let response = await this.sendRequest({deleteInfo}, url, "POST")
            this.setState({"personAuthorizationInfo": response}, () => history.push('/addressList'))
    }

    async sendInfoForUpdate() {
        const url = "main/update";
        let response = await this.sendRequest({}, url, "POST")
            this.setState({"personAuthorizationInfo":response})
            history.push('/addressList')
    }











    async sendInfoForChange(changeInfo) {
       changeInfo["id"]=this.state.idChangUser;
        const url = "main/change";
        let response = await this.sendRequest(changeInfo, url, "POST")
            this.setState({"personAuthorizationInfo":response})
            history.push('/addressList')
    }














    async sendInfoForAdding(addingInfo) {
        const url = "main/add";
             await this.generateRequest(addingInfo, url, "POST")
    }

    async sendingUserAuthorizationInformation(LoginPassword) {
        const url = "main/authorization";
        await this.generateRequest(LoginPassword, url, "POST")
    }


    async logOutFromSession() {
        const url = "main/logOut";
        await this.sendRequest({}, url, "POST")
        this.setState({"personAuthorizationInfo": ""})
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path='/' render={() => <AuthorizationPanel error={this.state.errorAuthorization}
                                                                            getUserInformation={this.sendingUserAuthorizationInformation.bind(this)}/>}/>
                    {this.state.errorAuthorization !== "" ?
                        <Popup text={this.state.errorAuthorization}
                               closePopup={this.closeAuthorizationPopup.bind(this)}/>
                        : <Route exact path='/addressList' render={() => <AddressList
                            changeData={this.sendInfoForChange.bind(this)}
                            openChangeForm={this.openChangeForm.bind(this)}
                            showForm={this.state.showForm}
                            logOutFromSession={this.logOutFromSession.bind(this)}
                            addUserInfo={this.sendInfoForAdding.bind(this)}
                            deleteUserInfo={this.sendDeleteInfo.bind(this)}
                            searchUserInfo={this.sendSearchInfo.bind(this)}
                            update={this.sendInfoForUpdate.bind(this)}
                            personAuthorizationInfo={this.state.personAuthorizationInfo}/>}/>}
                    {this.state.statusRegistration === "" ? <Route path='/registration' render={() => <RegistrationPanel
                        sendingUserRegistrationInformation={this.sendingUserRegistrationInformation.bind(this)}
                    />}/> : <Popup text={this.state.statusRegistration}
                                   closePopup={this.closeRegistrationPopup.bind(this)}/>}
                </div>
            </Router>
        );
    }
}

export default App;
