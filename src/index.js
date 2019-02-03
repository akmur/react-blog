import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const storedJson = sessionStorage.getItem('postsList')

if (storedJson) {
  console.log('session')
  ReactDOM.render(
    <App posts={JSON.parse(storedJson)} />,
    document.getElementById('root')
  )
} else {
  fetch(
    'https://public-api.wordpress.com/rest/v1.1/sites/akmur.wordpress.com/posts/?number=100'
  )
    .then(function(response) {
      return response.json()
    })
    .then(function(posts) {
      sessionStorage.setItem('postsList', JSON.stringify(posts))
      console.log('fetch')
      ReactDOM.render(<App posts={posts} />, document.getElementById('root'))
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
