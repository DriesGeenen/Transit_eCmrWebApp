import axios from "axios";
import { observable, extendObservable } from 'mobx';

class LoginStore {
    constructor() {
        this.apiUrl = "http://localhost:6600/auth/";
        extendObservable(this,
            {
                Email: "",
                Password: "",
                LoggedIn: false
            }
        );
    }

    async SignIn(givenEmail, givenPassword) {
        const body = {email:givenEmail,password:givenPassword};
        let data = await axios.post(this.apiUrl + "login",body);
        if(data.data.success){
            this.LoggedIn = true;
            this.Email = givenEmail;
            this.Password = givenPassword;
            localStorage.setItem("token", data.data.token);
        }
    }

    LogOut() {
        this.LoggedIn = false;
        localStorage.clear();
    }


}

const loginStore = new LoginStore();
export default loginStore;