import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './scss/styles.scss'
import Routes from './Routes'
import { fetchPosts } from './fetchHelper'

class App extends Component {
  render() {
    fetchPosts()

    return (
      <div id="body" className="ui-dark">
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
