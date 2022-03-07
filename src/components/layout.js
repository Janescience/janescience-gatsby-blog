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
        <div className="nav-menu" >
          <ul className="nav-list grid">
              <li className="nav-item">
                
              </li>
          </ul>
          <i className="nav-icon nav-close"></i>
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
