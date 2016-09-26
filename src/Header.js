import React, { PropTypes } from 'react'
import './Header.css'

function Header ({ onClickHome }) {
  return (
    <div className='Header'>
      <h1 className='Header__title'>
        <button
          className='Header__mazedrivers'
          onClick={onClickHome}
        >
          Mazedrivers
        </button>
      </h1>
      <a
        className='Header__codeup'
        href='http://videumcodeup.se'
      >
        Videum Codeup
      </a>
      <a
        className='Header__github'
        href='https://github.com/videumcodeup?query=mazedrivers'
      >
        GitHub
      </a>
    </div>
  )
}

Header.propTypes = {
  onClickHome: PropTypes.func.isRequired
}

export default Header
