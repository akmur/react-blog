import React, { Component } from 'react'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

class Posts extends Component {
  state = {
    posts: [],
    loaded: false,
    emoji: ''
  }

  componentDidMount() {
    document.title = `Posts - Alessandro Muraro - Frontend Developer`

    const emojis = ['🐶', '😅', '🏃‍♂️', '🤦‍♀️', '🤔', '🚀', '⚛️']
    this.setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    const nIntervId = setInterval(() => {
      this.setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }, 500)

    const storedJson = sessionStorage.getItem('postsList')

    if (!storedJson) {
      fetch('https://muraro.xyz/wp/wp-json/wp/v2/posts?per_page=100')
        .then(response => {
          return response.json()
        })
        .then(posts => {
          sessionStorage.setItem('postsList', JSON.stringify(posts))
          clearInterval(nIntervId)
          this.setState({
            posts: posts,
            loaded: true
          })
        })
    } else {
      clearInterval(nIntervId)
      this.setState({
        posts: JSON.parse(storedJson),
        loaded: true
      })
    }
  }

  setEmoji(chosenEmoji) {
    this.setState({
      emoji: chosenEmoji
    })
  }

  render() {
    return (
      <div className="postsList">
        <ul className="postsList__list">
          {this.state.loaded ? (
            <div className="loading">
              <div role="img" class="loadingEmoji" aria-label="running man">
                {this.state.emoji}
              </div>{' '}
              Loading...
            </div>
          ) : (
            <div className="loading">
              <div role="img" class="loadingEmoji" aria-label="running man">
                {this.state.emoji}
              </div>{' '}
              Loading...
            </div>
          )}
        </ul>
      </div>
    )
  }
}

export default Posts
