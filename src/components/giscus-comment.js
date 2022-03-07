import React, { useState, useEffect, useCallback } from 'react'

const GiscusComment = ({ mapping }) => {
  const [isShowComment, setIsShowComment] = useState(true)

  const COMMENTS_ID = 'comments-container'


  const config = {
    repo: 'Janescience/janescience-gatsby-blog',
    repoId: 'R_kgDOG5-jKg',
    category: 'Announcements',
    categoryId: 'DIC_kwDOG5-jKs4CN7xK',
    reactions: '1',
    metadata: '0',
    theme: 'dark'
  }

  const fetchComments = useCallback(() => {
    setIsShowComment(false)
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', config.repo)
    script.setAttribute('data-repo-id', config.repoId)
    script.setAttribute('data-category', config.category)
    script.setAttribute('data-category-id', config.categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', config.reactions)
    script.setAttribute('data-emit-metadata', config.metadata)
    script.setAttribute('data-theme', config.theme)
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('data-lang', 'en')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [mapping])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) return
    fetchComments()
  }, [fetchComments])

  return (
    <div>
      {isShowComment && (
        <a onClick={fetchComments}>
          Load comments...
        </a>
      )}
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  )
}

export default GiscusComment