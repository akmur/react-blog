import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Helmet } from 'react-helmet'
dayjs.extend(relativeTime)

const striptags = require('striptags')

class Post extends React.Component {
  state = {
    post: { title: '', content: '', date: '' },
    loaded: false
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
      })
  }

  render() {
    const metaTitle = `${
      this.state.post.title
    } - Alessandro Muraro - Frontend Developer`
    const metaDescription = `${striptags(this.state.post.content, [], '\n')}`

    return (
      <div className="pageContent pageContent--post">
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta
            name="og:image"
            content="https://akmur.files.wordpress.com/2019/02/site-image.jpg"
          />
        </Helmet>
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
