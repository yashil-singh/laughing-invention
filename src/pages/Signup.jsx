import '../css/Login.css'
import { TextInput, PasswordInput, inputStyle } from '../components/Inputs';
import logo from '../assets/muscle-logo.png'
import { Button, buttonStyle } from '../components/Buttons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from "../hooks/useSignup";
import { Text, textStyle } from '../components/Text';

export const Signup = () => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const {signup, error, isLoading} = useSignup();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    const newUser = { ...form }

    async function handleSubmit(e) {
        e.preventDefault();
        await signup(newUser);
    }

    return(
        <div className="main-container">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to='/'><img src={logo} width={"150px"} alt='logo'/></Link>
                </div>
                <h1>Create an account</h1>
                
                <div className="form-container">
                    {error && <Text style={textStyle.errorText} text={error}/>}
                    <form onSubmit={handleSubmit}>
                        <TextInput 
                            type="text" 
                            placeholder="Full Name"
                            styles= {inputStyle.textFieldStyle}
                            onTextChange={(e) => updateForm({ name: e.target.value})}
                        />
                        <TextInput 
                            type="text" 
                            placeholder="Email Address"
                            styles= {inputStyle.textFieldStyle}
                            onTextChange={(e) => updateForm({ email: e.target.value})}
                        />
                        <PasswordInput 
                            type="text" 
                            placeholder="Password"
                            onTextChange={(e) => updateForm({ password: e.target.value})}
                        />
                        <Button 
                            type="Submit"
                            text="Signup"
                            style={hover ? buttonStyle.submitButtonHover : buttonStyle.submitButton }
                            disable={isLoading}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                        />
                    </form>
                    <Link to='/login' style={{color: '#000', fontSize: '14px', textDecoration: 'none'}}>Already have an account? Login here.</Link>
                </div>
            </div>
        </div>
    );
}