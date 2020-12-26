import React from 'react';

class AddressTable extends React.Component {
    onClickDeleteUserInfo=()=> {
        this.props.deleteUserInfo(this.props.id);
    }
    onClickOpenChangePanel=()=> {
        this.props.openChangeForm(this.props.id);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>{this.props.name}</td>
                <td>{this.props.phone}</td>
                <td>{this.props.city} </td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={this.onClickOpenChangePanel}>Change Data</button>
                </td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={this.onClickDeleteUserInfo}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default AddressTable;
