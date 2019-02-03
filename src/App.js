import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './scss/styles.scss'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div id="body" className="ui-dark">
        <div className="wrapper">
          <div className="layout">
            <Header />
            <div className="content">
              <Routes posts={this.props.posts} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
