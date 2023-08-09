import { useState } from "react";

export const Button = ({text, style, type, clickFunction}) => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <button style={hover ? buttonStyle.submitButtonHover : buttonStyle.submitButton} type={type} onClick={clickFunction} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{text}</button>
    );
}

export const buttonStyle = {
    submitButton: {
        width: "100%",
        padding: "15px",
        margin: "15px 0px",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#d3bc5f",
        transition: "0.3s all ease"
    },

    submitButtonHover: {
        width: "100%",
        padding: "15px",
        margin: "15px 0px",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#ac984b",
        transition: "0.3s all ease",
        color: "white"
    },
}