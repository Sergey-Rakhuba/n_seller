import React from "react";
export default function BtnLen(Text, action) {
    const handleClick = () => {
        if (typeof action === 'function') {
            action();
        } else {
            document.location = action;
        }
    };
    return (
        <button onClick={handleClick} className="btn_get-started">
            {Text}
        </button>
    )
}   ;