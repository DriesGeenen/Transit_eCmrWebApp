import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Current extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: "",
            receiver: "",
            finished: "",
            ecmrId: ""
        };

        this.onFinished = this.onFinished.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:6603/ecmrs/'+this.props.match.params.id)
            .then(res => {
                var finished = "";
                this.setState({
                    address: res.data.data.confirmedDelivery.location.address,
                    city: res.data.data.confirmedDelivery.location.city,
                    receiver: res.data.data.receiver.company,
                    ecmrId: res.data.data._id
                });

                if(!res.data.data.finished){
                    finished = (
                        <button className="btn btn-default orangeColor" onClick={this.onFinished}>ECMR finished</button>
                    );
                    this.setState({ finished: finished });
                }
            });
    }

    onFinished() {
        axios.patch('http://localhost:6603/ecmrs/update/'+this.props.match.params.id)
            .then(res => {
                axios.delete('http://localhost:6609/trackings/delete/'+this.state.ecmrId)
                    .then(ress => {
                        this.props.history.push('/dashboard');
                    });
            });


    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default marginTop-20">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Current CMR
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" name="address" value={this.state.address} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input type="text" name="city" value={this.state.city} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="receiver">Name receiver:</label>
                            <input type="text" name="receiver" value={this.state.receiver} readOnly />
                        </div>
                        <button className="btn btn-default orangeColor marginRight-20" onClick={this.props.history.goBack}>Go back</button>
                        {this.state.finished}
                    </div>
                </div>
            </div>
        );
    }
}

export default Current;