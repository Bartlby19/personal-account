import React from 'react';
import "./SearchPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInfo: '',
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

    onClickSearchUserInfo = () => {
        this.props.searchUserInfo(this.state)
        this.setState({searchInfo: ""})
    }

    onClickUpdate = () => {
        this.props.update()
    }

    render() {
        let disableButton;
        let map = new Map(Object.entries(this.state))
        for (let [, value] of map) {
            disableButton = value.trim() === '';
        }
        return (
            <div>
                <input type="text" id="inputPassword2" placeholder="Search" name="searchInfo"
                       onChange={this.handleInputChange} value={this.state.searchInfo}/>
                <button type="submit" className="btn btn-primary mb-3" onClick={this.onClickSearchUserInfo}
                        disabled={disableButton}>Search
                </button>
                <button type="submit" className="btn btn-primary mb-3 update_style" onClick={this.onClickUpdate}>Back
                </button>
            </div>

        );
    }
}


export default SearchPage;
