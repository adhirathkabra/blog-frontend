import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('renders title and author only by default', () => {
  const blog = {
    title: 'white',
    author: 'lava',
    url: 'http://blogs.cs/18',
    likes: 13
  }
  const dummyuser = {
    name: 'kabra'
  }
  const component = render(
    <Blog blog={blog} user={dummyuser} />
  )

  let div = component.container.querySelector('.detail')
  expect(div).toHaveStyle('display: none')
  div = component.container.querySelector('.basic')
  expect(div).not.toHaveStyle('display: none')
})

test('url and likes shown on pressing view button', () => {
  const blog = {
    title: 'white',
    author: 'lava',
    url: 'http://blogs.cs/18',
    likes: 13
  }
  const dummyuser = {
    name: 'kabra'
  }
  const component = render(
    <Blog blog={blog} user={dummyuser} />
  )
  
  const button = component.getByText('view')
  fireEvent.click(button)
  const div = component.container.querySelector('.detail')
  expect(div).not.toHaveStyle('display: none')
})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'white',
    author: 'lava',
    url: 'http://blogs.cs/18',
    likes: 13
  }
  const dummyuser = {
    name: 'kabra'
  }
  
  const mockHandler = jest.fn()
  
  const component = render(
    <Blog blog={blog} user={dummyuser} updateBlog={mockHandler} />
  )
  
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})