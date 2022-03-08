import React , { useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogSearch from "../components/search"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useFlexSearch } from 'react-use-flexsearch';
import * as Unicons from '@iconscout/react-unicons';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const [searchQuery, setSearchQuery] = useState('');

  const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);
  
  const unFlattenResults = results => 
    results.map(post => {
      const { date, slug, tag, title , featuredImage } = post;
      return { 
        slug, 
        frontmatter: 
        { 
          title, 
          date, 
          tag,
          featuredImage 
        } 
      };
    });
  
  

  const posts = searchQuery ? unFlattenResults(results) : data.allMarkdownRemark.nodes

  
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <h1 className="blogs-title">Blog</h1>
        <BlogSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="container" style={{ textAlign : 'center' , padding : '3rem'}}>
          <h5 >Blog posts not found.</h5><Unicons.UilTimesCircle size="40" color="#FB4506"/>
        </div>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <h1 className="blogs-title ">Blog</h1>
      <BlogSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
      <ol className="blog-container container grid" id="blogs">
  
        {
        posts.map(post => {
          const image = getImage(post.frontmatter.featuredImage)
          const title = post.frontmatter.title || post.fields.slug
          const slug = post.fields ?  post.fields.slug : post.slug

          return (
            <div key={slug} className="blog-content">
                <header>
                  <div >
                    <Link to={slug} itemProp="url">
                      <GatsbyImage image={image} className="blog-img"/>
                    </Link>
                  </div>
                  <div className="blog-data">
                    <h5>
                      <Link to={slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h5>
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
    localSearchPages {
      index
      store
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
