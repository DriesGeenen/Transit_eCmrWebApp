import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

import EcmrReader from '../components/ecmr_reader';

export default inject("LoginStore")(observer(class EcmrReaderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ecmrs: [],
            driverId: ""
        };
    }

    componentDidMount() {
        this.getEcmrs();
    }

    getEcmrs(){
        const email = this.props.LoginStore.Email;
        const finished = this.props.match.params.finished;

        var promise = axios.get("http://localhost:6601/users/withpassword/"+email);
        promise.then(function(result){
                let driverId = result.data.data._id;
                this.setState({ driverId:driverId });

                var url = "http://localhost:6603/ecmrs/current/"+driverId;
                if(finished === "finished"){
                    url = "http://localhost:6603/ecmrs/finished/"+driverId;
                }

                var promise2 = axios.get(url);
                promise2.then(function(result){
                    var ecmrs = result.data.data;
                    this.setState({ecmrs: ecmrs})
                }.bind(this),
                function (error){
                    console.log('Something went wrong')
                }.bind(this)
                );

            }.bind(this),
            function (error){
                console.log('Something went wrong')
            }.bind(this)
        );
    }

    render() {
        return (
            <div>
                <EcmrReader ecmrs={this.state.ecmrs}/>
            </div>
            /*<UserReader users={this.state.users} />*/
        );
    }
}))