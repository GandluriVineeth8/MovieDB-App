import {useState} from 'react'

import {Link, useHistory} from 'react-router-dom'

import './index.css'

import {IoMdClose, IoMdMenu} from 'react-icons/io'

import {MdHome, MdSchedule} from 'react-icons/md'

import {RxArrowTopRight} from 'react-icons/rx'

const Header = () => {
  const [isSowMenu, setToggle] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const history = useHistory()

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = () => {
    if (searchQuery) {
      history.push(`/search/${searchQuery}`)
    }
  }

  const toggleMenuBtn = () => {
    setToggle(prev => !prev)
  }
  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1 className="logo-name">movieDB</h1>
        </Link>
        <div>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="nav-items-lg">
          <Link to="/" className="link">
            <p className="item-lg">Home</p>
          </Link>
          <Link to="/top-rated" className="link">
            <p className="item-lg">Top Rated</p>
          </Link>
          <Link to="/upcoming" className="link">
            <p className="item-lg">Upcoming</p>
          </Link>
        </div>

        {!isSowMenu ? (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdMenu className="icon" />
          </button>
        ) : (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdClose className="icon" />
          </button>
        )}
      </nav>

      {isSowMenu ? (
        <div className="menu-div">
          <div className="nav-items-sm">
            <Link to="/" className="route-link">
              <MdHome className="route-icon" />
              <p className="item"> Home</p>
            </Link>
            <Link to="/top-rated" className="route-link">
              <RxArrowTopRight className="route-icon" />
              <p className="item">Top Rated Movies</p>
            </Link>
            <Link to="/upcoming" className="route-link">
              <MdSchedule className="route-icon" />
              <p className="item">Upcoming Movies</p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Header
