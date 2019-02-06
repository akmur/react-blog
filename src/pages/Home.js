import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div className="pageHome">
      <Helmet>
        <title>Alessandro Muraro - Frontend Developer</title>
        <meta
          name="description"
          content="I am a frontend developer currently based in Aachen, Germany. I do websites."
        />
        <meta
          name="og:image"
          content="https://filedn.com/lmWxu5DGgw0FbsUS7mWpc3S/site-image.jpg"
        />
      </Helmet>
      <div className="contentBlock contentBlock--home">
        <div className="contentBlock__preTitle u-center">
          Hi there, I'm Alessandro Muraro.
        </div>
        <h1 className="contentBlock__title u-center">
          I'm a frontend developer,
          <br />I do web.
          <span className="emoji" role="img" aria-label="waving hand">
            👋
          </span>
        </h1>
      </div>
    </div>
  )
}

export default Home
