import React from 'react'
import { Router } from '@reach/router'
import About from './pages/About'
import Home from './pages/Home'
import Posts from './pages/Posts'
import AppWrapper from './AppWrapper'

class Routes extends React.Component {
  render() {
    return (
      <Router primary={false}>
        <AppWrapper path="/">
          <Home path="/" />
          <About path="/about" />
          <Posts posts={this.props.posts} path="/posts" />
        </AppWrapper>
      </Router>
    )
  }
}

export default Routes
