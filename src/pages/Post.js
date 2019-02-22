import React from 'react'
import dayjs from 'dayjs'
import Prism from 'prismjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const striptags = require('striptags')

function truncate(str, no_words) {
  return (
    str
      .split(' ')
      .splice(0, no_words)
      .join(' ') + ' [...]'
  )
}

class Post extends React.Component {
  state = {
    post: { title: '', content: '', date: '' },
    loaded: false
  }

  triggerPrism() {
    Prism.highlightAll()
  }

  componentDidMount() {
    fetch(`https://muraro.xyz/wp/wp-json/wp/v2/posts/${this.props.id}?_embed`)
      .then(response => {
        return response.json()
      })
      .then(post => {
        const hasThumbnail =
          typeof post._embedded['wp:featuredmedia'] === 'undefined'
            ? false
            : true
        this.setState({
          post,
          hasThumbnail,
          loaded: true
        })

        document.title = `${
          this.state.post.title.rendered
        } - Alessandro Muraro - Frontend Developer`

        document
          .querySelector('meta[name="description"]')
          .setAttribute(
            'content',
            truncate(striptags(this.state.post.content.rendered, [], '\n'), 50)
          )

        this.state.hasThumbnail
          ? document
              .querySelector('meta[name="og:image"]')
              .setAttribute(
                'content',
                this.state.post._embedded['wp:featuredmedia'][0].source_url
              )
          : document
              .querySelector('meta[name="og:image"]')
              .setAttribute(
                'content',
                'https://filedn.com/lmWxu5DGgw0FbsUS7mWpc3S/site-image.jpg'
              )

        this.triggerPrism()
      })
  }

  render() {
    return (
      <div className="pageContent pageContent--post">
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
        <h1 className="pageContent__title title title--h1">
          {this.state.post.title.rendered}
        </h1>
        {this.state.post.date ? (
          <div className="pageContent__date date">
            {dayjs().to(dayjs(this.state.post.date))}
          </div>
        ) : (
          ''
        )}
        {this.state.hasThumbnail ? (
          <div className="pageContent__image">
            <img
              src={this.state.post._embedded['wp:featuredmedia'][0].source_url}
              alt="Cover"
            />
          </div>
        ) : (
          ''
        )}
        <div
          className="pageContent__content"
          dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }}
        />
      </div>
    )
  }
}

export default Post
