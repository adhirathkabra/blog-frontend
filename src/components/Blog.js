import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [ likes, increaseLikes ] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detail, setDetail] = useState(false)
  let text = 'view'
  if(detail === true) {
    text = 'hide'
  }
  const showDetail = { display: detail ? '' : 'none' }

  const updateLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }
    updateBlog(blogObject, blog.id)
    increaseLikes(likes+1)
  }

  const delBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='basic'>
        {blog.title} {blog.author}
        <button onClick={() => setDetail(!detail)}>{text}</button>
      </div>
      <div style={showDetail} className='detail'>
        {blog.url} <br />
        likes {likes}
        <button id='like' onClick={updateLikes}>like</button><br />
        {user.name}<br />
        <button onClick={delBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
