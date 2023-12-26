import React from 'react'

const Button = ({ text, className ,onClick, type }) => {
    return (
        <button type={type} onClick={onClick} className={className}>{text}</button>
    )
}

Button.defaultProps = {
    text: 'Add',
    type: 'button',
    className: 'btn'
}

export default Button
