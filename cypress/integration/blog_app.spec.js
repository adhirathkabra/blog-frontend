describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'java',
      username: 'java123',
      password: 'haka'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('java123')
      cy.get('#password').type('haka')
      cy.get('#login-button').click()
      cy.get('.notif').contains('Login Successful')
      cy.contains('java logged in')
      cy.contains('blogs')
      cy.contains('logout')
      cy.contains('create new blog')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('java123')
      cy.get('#password').type('hakaniemi')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('log in to application')
      cy.get('#login-button').contains('login')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('java123')
      cy.get('#password').type('haka')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('rainbow')
      cy.get('#author').type('sava')
      cy.get('#url').type('http://blogs.cs/29')
      cy.get('#addblog-button').click()
      cy.contains('rainbow')
      cy.contains('sava')
    })

    it('user can like a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('rainbow')
      cy.get('#author').type('sava')
      cy.get('#url').type('http://blogs.cs/29')
      cy.get('#addblog-button').click()
      cy.contains('rainbow').parent().find('button').click()
      cy.contains('likes')
      cy.contains('0')
      cy.get('#like').click()
      cy.contains('1')
    })
  })
})