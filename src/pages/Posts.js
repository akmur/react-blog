import React, { Component } from 'react'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

class Posts extends Component {
  render() {
    return (
      <div className="postsList">
        <ul className="postsList__list">
          {this.props.posts.posts.map((post, index) => (
            <li className="postsList__item" key={index}>
              <Link
                className="postsList__link"
                state={{ id: post.ID }}
                to={`/posts/${post.slug}`}
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
