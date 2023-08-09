import '../css/Login.css'
import { TextInput, PasswordInput, inputStyle} from '../components/Inputs';
import logo from '../assets/muscle-logo.png'
import { Button, buttonStyle } from '../components/Buttons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { Text, textStyle } from '../components/Text';

export const Login = () => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const { login, error, isLoading } = useLogin();

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

    const user = { ...form }

    async function handleSubmit(e) {
        e.preventDefault();
        await login(user);
    }

    return(
        <div className="main-container">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to='/'><img src={logo} width={"150px"} alt='logo'/></Link>
                </div>
                <h1>Welcome Back</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {error && <Text style={textStyle.errorText} text={error}/>}
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
                            text="Login"
                            disabled={isLoading}
                            style={ hover ? buttonStyle.submitButtonHover : buttonStyle.submitButton }
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                        />
                    </form>
                    <Link to="/signup" style={{color: '#000', fontSize: '14px', textDecoration: 'none'}}>Don't have an account? Signup here.</Link>
                </div>
            </div>
        </div>
    );
}