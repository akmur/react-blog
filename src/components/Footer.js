import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Find me on: <br />
          <a className="footer__link" href="https://mastodon.social/@akmur">
            Mastodon
          </a>
          ,
          <a className="footer__link" href="https://twitter.com/akmur">
            Twitter
          </a>
          ,
          <a
            className="footer__link"
            href="https://www.linkedin.com/in/alessandromuraro/"
          >
            LinkedIn
          </a>
          ,
          <a className="footer__link" href="https://github.com/akmur">
            Github
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
