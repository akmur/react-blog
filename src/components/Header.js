import React from 'react'
import { Link } from '@reach/router'
import SvgLeft from './SvgLeft'
import SvgCenter from './SvgCenter'
import SvgRight from './SvgRight'

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <SvgLeft />
        <SvgCenter />
        <SvgRight />
      </Link>
      <div id="nav">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/about" className="nav__link">
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/posts" className="nav__link">
                Posts
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
