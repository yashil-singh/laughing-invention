export const Text = ({text, style}) => {
    return (
        <button style={style} >{text}</button>
    );
}

export const textStyle = {

    errorText: {
        width: "100%",
        padding: "15px",
        margin: "10px 0px",
        borderRadius: "5px",
        border: "1px solid #e46962",
        color: "#e46962",
        backgroundColor: "#eddfde"
    },

    successText: {
        width: "100%",
        padding: "15px",
        margin: "10px 0px",
        cursor: "not-allowed",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#ccc"
    }
}