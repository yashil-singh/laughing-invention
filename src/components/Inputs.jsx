import { useState } from "react";
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'


export const TextInput = ({onTextChange, placeholder, type, styles}) => {
    return (
        <div className="input-field" style={styles}>
            <input 
                type={type}
                placeholder={placeholder}
                onChange={onTextChange}
                style={{
                    outline: "none",
                    border: "none", 
                    width: "100%"
                }}
            />
        </div>
    );
}

export const PasswordInput = ({onTextChange, type, placeholder, styles}) => {
    const [visible, setVisible] = useState(false);
    const togglePassword = () => {
        return(setVisible(!visible));    
    }

    return (
        <div className="input-field" style={inputStyle.textFieldStyle}>
            <input
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                onChange={onTextChange}
                style={{
                    outline: "none",
                    border: "none",
                    width: "100%"
                }}
            />
            <span><Icon icon={visible ? eye : eyeOff} size={20} onClick={togglePassword} style={{cursor: "pointer"}}/></span>
        </div>
    );
}

export const inputStyle = {
    textFieldStyle: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "100%",
        padding: "10px",
        alignItems: "center",
        margin: "10px 0px",
        outline: "none",
        background: "white"
    },

    errorTextFieldStyle: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "100%",
        borderBottom: "1px solid",
        padding: "10px",
        alignItems: "center",
        margin: "10px 0px",
        outline: "none",
        border: "1px solid #e7195a",
        background: "white"
    },

    fieldStyle: {
        padding: "10px",
        width: "100%",
        margin: "10px 0px",
        border: "none",
        borderBottom: "1px solid black",
        outline: "none"
    }
}
