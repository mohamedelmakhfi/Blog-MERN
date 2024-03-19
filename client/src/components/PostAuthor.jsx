import React from 'react'
import { Link } from 'react-router-dom'

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/sdfsd`} className='post__author'>
        <div className="post__author-avatar">
            <img src="" alt="" />
        </div>
        <div className="post__author-details">
            <h5>by : med elma</h5>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor