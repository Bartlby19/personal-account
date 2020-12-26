import React from 'react';

class UpdateDataForm extends React.Component {
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

    onClickChangData = () => {
        this.props.changeData(this.state)
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="inputAddress">User name</label>
                    <input type="text" className="form-control" id="inputAddress" name="userName"
                           placeholder="User name" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Phone</label>
                    <input type="text" className="form-control" id="inputAddress2" name="phone"
                           onChange={this.handleInputChange}
                           placeholder="Phone"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity" placeholder="City" name="city"
                               onChange={this.handleInputChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onClickChangData}>Update</button>
            </form>

        )
    }
}

export default UpdateDataForm;
