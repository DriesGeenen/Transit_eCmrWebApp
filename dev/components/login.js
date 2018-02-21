import React, { Component } from 'react';
import { Button, Icon, Input, Card } from "react-materialize";
import { observer, inject } from 'mobx-react';

export default inject("LoginStore")(observer(class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:''
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onEmailChange(event) {
        var email = event.target.value;
        this.setState({email:email});
    }

    onPasswordChange(event) {
        var password = event.target.value;
        this.setState({password:password});
    }

    async onLogin() {
        await this.props.LoginStore.SignIn(this.state.email,this.state.password);

        if(this.props.LoginStore.LoggedIn){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (<div className="row marginTop-100">
            <div className="col m6 offset-m3 s12">
                <Card className='input-field darken-1 z-depth-4' textClassName='' title='Login' actions={[<Button key="loginButton" className="orange darken-3" onClick={this.onLogin} waves='light'>Login</Button>]}>
                    <Input id="icon_prefix" s={12} label="E-mail" value={this.state.email} onChange={this.onEmailChange} type="text" />
                    <Input s={12} label="Password" value={this.state.password} onChange={this.onPasswordChange} type="password" />
                    <div className="clearfix" />
                </Card>
            </div>
        </div>);
    }
}))