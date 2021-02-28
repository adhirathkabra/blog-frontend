import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('Blog form calls event handler with correct details', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'grey' } 
  })
  fireEvent.change(author, { 
    target: { value: 'pava' } 
  })
  fireEvent.change(url, { 
    target: { value: 'http://blogs.cs/21' } 
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls[0][0].title).toBe('grey')
  expect(addBlog.mock.calls[0][0].author).toBe('pava')
  expect(addBlog.mock.calls[0][0].url).toBe('http://blogs.cs/21')
})