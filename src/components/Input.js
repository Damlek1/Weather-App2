import React from 'react'
import './input.css'
import {FiSearch} from 'react-icons/fi'

const Input = ({text, submit, func}) => {
  return (
    <form className='input' onSubmit={submit}>
        <input type={'text'} placeholder='Please enter location' className='search_value' onChange={text} />
        <span className='search_icon' onClick={func}>
            <FiSearch />
        </span>
    </form>
  )
}

export default Input