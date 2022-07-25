import React from 'react'
import './style.css'


const Button = ({onClick, text, className, style, type}) => {
  return (
    <button style={style} type={type} className={className} onClick={onClick}>{text}</button>
  )
}


export default Button;