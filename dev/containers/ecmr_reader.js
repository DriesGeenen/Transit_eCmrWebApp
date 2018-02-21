import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

import UserReader from '../components/user_reader';

export default inject("LoginStore")(observer(class EcmrReaderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ecmrs: [],
            email: ""
        };
    }

    componentDidMount() {
        console.log("componentDidMount LIJST ECMRS");
        this.getEcmrs();
    }

    getEcmrs(){
        const email = this.props.LoginStore.Email;
        this.setState({email:email});

        /*var promise = axios.get("http://localhost:6601/users/");

        promise.then(function(result){
                let users = result.data.data;
                this.setState({ users:users });
            console.log(result.data.data);
            }.bind(this),
            function (error){
                console.log('Something went wrong')
            }.bind(this)
        );*/
    }

    render() {
        return (
            <div>
                <p>hoi {this.state.email}</p>
            </div>
            /*<UserReader users={this.state.users} />*/
        );
    }
}))