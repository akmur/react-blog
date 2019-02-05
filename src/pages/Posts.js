import React, { Component } from 'react'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

class Posts extends Component {
  state = {
    posts: {
      posts: [],
      loaded: false
    }
  }

  componentDidMount() {
    const storedJson = sessionStorage.getItem('postsList')

    if (storedJson) {
      this.setState({
        posts: JSON.parse(storedJson),
        loaded: true
      })
    } else {
      fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/akmur.wordpress.com/posts/?number=100'
      )
        .then(response => {
          return response.json()
        })
        .then(posts => {
          sessionStorage.setItem('postsList', JSON.stringify(posts))
          this.setState({
            posts,
            loaded: true
          })
        })
    }
  }
  render() {
    return (
      <div className="postsList">
        <ul className="postsList__list">
          {this.state.loaded ? (
            ''
          ) : (
            <div className="loading">
              <span role="img" aria-label="running man">
                🏃‍♂️
              </span>{' '}
              Loading...
            </div>
          )}
          {this.state.posts.posts.map((post, index) => (
            <li className="postsList__item" key={index}>
              <Link
                className="postsList__link"
                state={{ id: post.ID }}
                to={`/posts/${post.ID}/${post.slug}`}
              >
                <h2 className="postsList__title">{post.title}</h2>
                <span className="postsList__date">
                  {dayjs().to(dayjs(post.date))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Posts
