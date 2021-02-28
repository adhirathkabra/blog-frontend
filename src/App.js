import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notif'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setErrorMessage] = useState(null)
  const [notif, setNotif] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef  = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotif('Login Successful')
      setTimeout(() => {
        setNotif(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
    setNotif(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    setTimeout(() => {
      setNotif(null)
    }, 3000)
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async (blogObject, id) => {
    await blogService.update(blogObject, id)
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const blogList = () => {
    let sortedBlogs = blogs
    sortedBlogs.sort((a,b) => b.likes - a.likes)
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm addBlog={createBlog} />
        </Togglable>
        <br />
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notif} />
      <Error message={error} />
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App