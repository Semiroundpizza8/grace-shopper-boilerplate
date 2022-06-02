import React, { useState } from 'react';
import { registerUser, loginUser } from '../axios-services/user';

const Register = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            username: userName,
            password: password,
            email: email,
            firstname: firstName,
            lastname: lastName,
            role: "user"
        }
        console.log(user)
        await registerUser(user);
        //console.log(localStorage.getItem(token));
        setUserName('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setLoggedIn(!!localStorage.getItem("token"))
    };
    const updateUserName = (event) => {
        setUserName(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };
    const updateEmail =(event) => {
        setEmail(event.target.value)
    }
    const updateFirstName =(event) => {
        setFirstName(event.target.value)
    }
    const updateLastName =(event) => {
        setLastName(event.target.value)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit }>
            <input type = 'text' placeholder = "First Name" value = {firstName} onChange = {updateFirstName} />
                <input type = 'text' placeholder = "Last Name" value = {lastName} onChange = {updateLastName} />
                <input type = 'text' placeholder = "Register Username" value = {userName} onChange = {updateUserName} />
                <input type = 'text' placeholder = "Register Password" value = {password} onChange = {updatePassword} />
                <input type = 'text' placeholder = "Register Email" value = {email} onChange = {updateEmail} />
                <button > Register </button>
            </form>
        </div>
    )
}

export default Register;