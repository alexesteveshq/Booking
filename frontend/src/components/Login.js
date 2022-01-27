import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api';

const Login = ({setUser}) => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('') 

    const handleSubmit = async (event) => {
        event.preventDefault();
        return api.login({email: event.target.email.value, password: event.target.password.value, remember_me: true}).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', JSON.stringify(response.data.access_token))
            setUser(JSON.parse(localStorage.getItem('user')))
            navigate('/home');
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
         });
    }

    return <div class="form-container">
            <h2>Login</h2>
            <form class="main-form" onSubmit={(event) => handleSubmit(event)}>
                <input type="email" name="email" required/>
                <input type="password" name="password" required/>
                <input type="submit" class="submit-button" value="Send"/>
            </form>
            <div className={errorMessage !== '' ? 'error-message active' : 'error-message'}>{errorMessage}</div>
        </div>
}

export default Login;
