import React from 'react';
import "./RegistrationPanel.css"
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {loadUserInfo} from "../redux/actions";

class RegistrationPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            login: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="color">
                <div className="fadeInDown color">
                    <form method="post">
                        <div className="center">
                            <Link to='/'>
                                <h2 className="inactive underlineHover h2 ">
                                    <div className="sizeHref">Sign In</div>
                                </h2>
                            </Link>
                            <h2 className="active  h2">
                                <div className="sizeHref">Sign Up</div>
                            </h2>
                        </div>
                        <fieldset>
                            <legend><span className="number">1</span>Your basic info</legend>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={this.state.name}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="mail">Email:</label>
                            <input type="email" id="mail" name="email" value={this.state.email}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="login">Login:</label>
                            <input type="text" id="login" name="login" value={this.state.login}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </fieldset>
                        <button type="submit" className="button"> Sign Up
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    createPost, showAlert
};
const mapStateToProps = state => ({
    alert: state.app.alert

});
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPanel);
