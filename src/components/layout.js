import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  const nav = (
      <div className="nav container">
        <h3 className="main-heading">
          <Link to="/">{title}</Link>
          
        </h3>
        <div className="webring">
          <a href="https://webring.wonderful.software/#/janescience.com" title="วงแหวนเว็บ">
            <img
              alt="วงแหวนเว็บ"
              width="32"
              height="32"
              src="https://webring.wonderful.software/webring.white.svg"
            />
          </a>
        </div>
      </div>
    )


  return (
    <div className={isRootPath ? "" : "container"} data-is-root-path={isRootPath}>
      <header className="header">{nav}</header>
      <main>{children}</main>
      <footer className="container">
        © {new Date().getFullYear()} Janescience , Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>.
        {` `}
        All Rights Reserved.
      </footer>
    </div>
  )
}

export default Layout
