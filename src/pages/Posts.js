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
            this.state.posts.map((post, index) => (
              <li className="postsList__item" key={index}>
                <Link
                  className="postsList__link"
                  state={{ id: post.id }}
                  to={`/posts/${post.id}/${post.slug}`}
                >
                  <h2 className="postsList__title">{post.title.rendered}</h2>
                  <span className="postsList__date">
                    {dayjs().to(dayjs(post.date))}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <div className="loading">
              <div role="img" className="loadingEmoji" aria-label="running man">
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
