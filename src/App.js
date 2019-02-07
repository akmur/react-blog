import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './scss/styles.scss'
import Routes from './Routes'
import { Helmet } from 'react-helmet'

class App extends Component {
  render() {
    return (
      <div id="body" className="ui-dark">
        <Helmet>
          <title>Alessandro Muraro - Frontend Developer</title>
          <meta
            name="description"
            content="I am a frontend developer currently based in Aachen, Germany. I do websites."
          />
          <meta
            name="og:image"
            content="https://filedn.com/lmWxu5DGgw0FbsUS7mWpc3S/site-image.jpg"
          />
        </Helmet>
        <div className="wrapper">
          <div className="layout">
            <Header />
            <div className="content">
              <Routes />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
