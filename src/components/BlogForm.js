import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleInputTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleInputAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleInputUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className='blogForm'>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input id='title' value={newTitle} onChange={handleInputTitle}/><br />
          author: <input id='author' value={newAuthor} onChange={handleInputAuthor}/><br />
          url: <input id='url' value={newUrl} onChange={handleInputUrl}/>
        </div>
        <div>
          <button id='addblog-button' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm