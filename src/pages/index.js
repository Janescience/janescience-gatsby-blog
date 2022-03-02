import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { GatsbyImage, getImage } from "gatsby-plugin-image"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <h1 className="blogs-title">Blogs</h1>
      <ol className="blog-container grid" id="blogs">
        
        {posts.map(post => {
        const image = getImage(post.frontmatter.featuredImage)
        const title = post.frontmatter.title || post.fields.slug

          return (
            <div key={post.fields.slug} className="blog-content">
                <header>
                  <div >
                    <Link to={post.fields.slug} itemProp="url">
                      <GatsbyImage image={image} className="blog-img"/>
                    </Link>
                  </div>
                  <div className="blog-data">
                    <h3>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                  </div>
                  <div className="blog-footer">
                    <small className="blog-date">{post.frontmatter.date}</small>
                    <small className="blog-tag">{post.frontmatter.tag}</small>
                  </div>
                </header>
            </div>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tag
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 1000
                layout : CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`
