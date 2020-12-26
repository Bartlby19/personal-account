import React from 'react';
import "./AddressList.css"
import {Link} from "react-router-dom";
import AddressTable from "./AddressTable/AddressTable.jsx";
import AddUserInfo from "./AddUserInfo/AddUserInfo.jsx";
import SearchPage from "../SearchPage/SearchPage";
import UpdateDataForm from "./UpdateDataForm/UpdateDataForm";

class AddressList extends React.Component {

    render() {
        let showAddressList = [];
        let address = this.props.personAuthorizationInfo;
        for (let i = 0; i < address.length; i++) {
            let dataComponent =
                <AddressTable
                    key={i}
                    number={i + 1}
                    name={address[i]["name"]}
                    id={address[i]["id"]}
                    phone={address[i]["phone"]}
                    city={address[i]["city"]}
                    deleteUserInfo={this.props.deleteUserInfo}
                    openChangeForm={this.props.openChangeForm}
                />
            showAddressList.push(dataComponent)
        }
        return (
            <>
                {this.props.showForm ?
                    <div>
                        <div className=" button_padding">
                            <Link to='/'>
                                <button onClick={this.props.logOutFromSession}
                                        className="btn btn-primary button_padding">Log
                                    out
                                </button>
                            </Link>
                            <div>
                                <SearchPage searchUserInfo={this.props.searchUserInfo} update={this.props.update}/>
                            </div>
                        </div>
                        <AddUserInfo addUserInfo={this.props.addUserInfo}/>
                        <div>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Change Data</th>
                                    <th scope="col">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showAddressList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <UpdateDataForm changeData={this.props.changeData}/>}
            </>

        );
    }
}


export default AddressList;
