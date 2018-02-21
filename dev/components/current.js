import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Current extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {firstName:'',lastName:'',email:'',phone:'',role:'user'},
            checked: false,
            output: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassClick = this.onChangePassClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:6601/users/'+this.props.match.params.id)
            .then(res => {
                this.setState({ user: res.data.data });

                if (this.state.user.role === "admin"){
                    let check = true;
                    this.setState({checked: check});
                }
            });
    }

    onChange(e) {
        if(e.target.type === 'checkbox'){
            let role = e.target.checked? "admin" : "user";
            const state = this.state.user;
            state[e.target.name] = role;
            this.setState({user:state, checked: e.target.checked});
        } else {
            const state = this.state.user;
            state[e.target.name] = e.target.value;
            this.setState({user:state});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { firstName, lastName, password, email, phone, role } = this.state.user;

        axios.put('http://localhost:6600/auth/update/'+this.props.match.params.id, { firstName, lastName, password, email, phone, role })
            .then((result) => {
                this.props.history.push("/users");
            });
    }

    onChangePassClick(e){
        const output = (
            <div className="form-group"><label htmlFor="password">Wachtwoord:</label>
            <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Nieuw wachtwoord" /></div>
        );

        this.setState({output: output});
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Gebruiker bewerken
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Voornaam:</label>
                                <input type="text" className="form-control" name="firstName" value={this.state.user.firstName} onChange={this.onChange} placeholder="Voornaam" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Achternaam:</label>
                                <input type="text" className="form-control" name="lastName" value={this.state.user.lastName} onChange={this.onChange} placeholder="Achternaam" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={this.onChange} placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefoon:</label>
                                <input type="text" className="form-control" name="phone" value={this.state.user.phone} onChange={this.onChange} placeholder="Telefoon" />
                            </div>
                            <div>
                                <label htmlFor="role">Admin:</label>
                                <input type="checkbox" className="form-control" name="role" onChange={this.onChange} checked={this.state.checked} />
                            </div>
                            <div className="form-group marginTop-20">
                                <a onClick={this.onChangePassClick}>Wachtwoord wijzigen</a>
                            </div>
                            {this.state.output}
                            <button type="submit" className="btn btn-primary">Opslaan</button>
                            <Link className="btn btn-default" to={`/users`}>Annuleren</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Current;