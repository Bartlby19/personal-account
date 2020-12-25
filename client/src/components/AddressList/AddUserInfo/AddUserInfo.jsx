import React from 'react';
import "./AddUserInfor.css"

class AddUserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            phone: '',
            city: '',
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

    onClickAddUserInfo = () => {
        this.props.addUserInfo(this.state)
    }

    render() {
        let disableButton;
        let map = new Map(Object.entries(this.state))
        for (let [, value] of map) {
            disableButton = value.trim() === '';
        }

        return (
            <form className="form_style">
                <div className="form-group mx-sm-3 mb-2">
                    <label className="sr-only">User name</label>
                    <input className="input_style" placeholder="User name" name="userName" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label className="sr-only">Phone</label>
                    <input className="input_style" placeholder="Phone" name="phone" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label className="sr-only">City</label>
                    <input className="input_style" placeholder="City" name="city" onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary bt_style" onClick={this.onClickAddUserInfo}
                        disabled={disableButton}>Add
                </button>
            </form>
        )
    }
}

export default AddUserInfo;
