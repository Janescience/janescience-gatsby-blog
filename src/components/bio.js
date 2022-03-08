/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio container grid">
      <div className="bio-content grid">
        <div class="bio-link">
            <a href="https://github.com/Janescience" target="_blank" className="bio-link-icon">
                <Unicons.UilGithubAlt/>
            </a>
            <a href="https://www.linkedin.com/in/janewit-sirijan-562a45169/" target="_blank" className="bio-link-icon">
                <Unicons.UilLinkedinAlt/>
            </a>
        </div>
        <div className="bio-img">
            <svg className="bio-blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <mask id="mask0" mask-type="alpha">
                      <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                      130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                      97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                      0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                  </mask>
                  <g mask="url(#mask0)">
                      <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                      165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                      129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                      -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                      <image className="bio-blob-img" x="-25" y="-20" xlinkHref="https://i.ibb.co/dGgr58W/jane.png"/>
                  </g>
              </svg>
        </div>
        <div className="bio-data">
            <h1 className="bio-title">สวัสดี , ผม Janescience</h1>
            <div className="bio-subtitle">Full Stack Web Developer </div>
            <p className="bio-description">แค่อยากมีเว็บแนะนำตนเอง สะสมผลงาน และบันทึกการเรียนรู้ โดยมีเนื้อหาเกี่ยวกับสิ่งที่ได้เรียนรู้ต่างๆ ขึ้นอยู่กับความสนใจในช่วงนั้น ... 
            <a className="have-under" href="about"> อ่านต่อ</a>
            </p>
            
        </div>
      </div>

      <div class="bio-scroll">
          <a href="#blogs" class="bio-scroll-button button--flex">
              <Unicons.UilMouseAlt size="30" color="#FB4506"/>
              <span class="bio-scroll-name">อ่าน Blog</span>
              <Unicons.UilAngleDown color="#FB4506"/> 
          </a>
      </div>
     
    </div>
  )
}

export default Bio
