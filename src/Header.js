import React from 'react'
import './Header.css'

function Header () {
  return (
    <div className='Header'>
      <h1 className='Header__title'>Mazedrivers</h1>
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
}

export default Header
