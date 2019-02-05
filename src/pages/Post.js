import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Helmet } from 'react-helmet'
dayjs.extend(relativeTime)

const striptags = require('striptags')

class Post extends React.Component {
  state = {
    post: { title: '', content: '', date: '' }
  }

  componentDidMount() {
    fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/akmur.wordpress.com/posts/${
        this.props.id
      }`
    )
      .then(response => {
        return response.json()
      })
      .then(post => {
        console.log(post)
        this.setState({
          post
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
        <h1 className="pageContent__title title title--h1">
          {this.state.post.title}
        </h1>
        {this.state.post.date ? (
          <div className="pageContent__date date">
            {dayjs().to(dayjs(this.state.post.date))}
          </div>
        ) : (
          ''
        )}
        {this.state.post.post_thumbnail ? (
          <div className="pageContent__image">
            <img src={this.state.post.post_thumbnail.URL} alt="Cover" />
          </div>
        ) : (
          ''
        )}
        <div
          className="pageContent__content"
          dangerouslySetInnerHTML={{ __html: this.state.post.content }}
        />
      </div>
    )
  }
}

export default Post
