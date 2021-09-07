describe('Users', () => {
  beforeEach(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('Modify my account', () => {
    cy.login();

    cy.intercept('POST', '/api/account').as('modify-account');
    cy.visit('/account');
    cy.get('[data-cy=firstName]').clear().type('myFirstName');
    cy.get('[data-cy=lastName]').clear().type('myLastName');
    cy.get('[data-cy=email]').clear().type('myEmail@localhost');
    cy.get('[data-cy=langKey]').click();
    cy.get('.q-menu .q-item').first().click();
    cy.get('[type=submit]').click();
    cy.wait('@modify-account').its('response.statusCode').should('eq', 200);

    cy.visit('/account');
    cy.get('[data-cy=firstName]').should('have.value', 'myFirstName');
    cy.get('[data-cy=lastName]').should('have.value', 'myLastName');
    cy.get('[data-cy=email]').should('have.value', 'myemail@localhost');
  });

  it('List users', () => {
    cy.login();

    cy.intercept('/api/admin/users*').as('users');
    cy.visit('/users');
    cy.wait('@users').its('response.statusCode').should('eq', 200);
  });

  it('List users with pagination (stub)', () => {
    cy.login();

    cy.intercept('/api/admin/users?page=0&size=10&sort=login,asc', {
      fixture: 'usersPage1Size10.json',
      headers: { 'x-total-count': '15' },
    }).as('usersPage1Size10');

    cy.intercept('/api/admin/users?page=1&size=10&sort=login,asc', {
      fixture: 'usersPage2Size10.json',
      headers: { 'x-total-count': '15' },
    }).as('usersPage2Size10');

    cy.visit('/users');
    cy.wait('@usersPage1Size10').its('response.statusCode').should('eq', 200);
    cy.get('.q-tr').should('have.length', 10);

    cy.visit('/users?page=2&sortBy=login&descending=false&rowsPerPage=10');
    cy.wait('@usersPage2Size10').its('response.statusCode').should('eq', 200);
    cy.get('.q-tr').should('have.length', 5);
  });

  it('Create a new user', () => {
    cy.login();

    const timestamp = new Date().getTime();
    cy.intercept('POST', '/api/admin/users').as('create-new-user');
    cy.visit('/users/new');
    cy.get('[data-cy=login]').type(`myLogin${timestamp}`);
    cy.get('[data-cy=firstName]').type('myFirstname');
    cy.get('[data-cy=lastName]').type('myLastname');
    cy.get('[data-cy=email]').type(`myEmail${timestamp}@localhost`);
    cy.get('[data-cy=langKey]').click();
    cy.get('.q-menu .q-item').first().click();
    cy.get('[data-cy=authorities]').click();
    cy.get('[data-cy=toggle').first().click();
    cy.get('[type=submit]').click();
    cy.wait('@create-new-user').its('response.statusCode').should('eq', 201);

    cy.visit('/users/new');
    cy.get('[data-cy=login]').type(`myLogin${timestamp}`);
    cy.get('[data-cy=firstName]').type('myFirstname');
    cy.get('[data-cy=lastName]').type('myLastname');
    cy.get('[data-cy=email]').type(`myEmail${timestamp}@localhost`);
    cy.get('[data-cy=langKey]').click();
    cy.get('.q-menu .q-item').first().click();
    cy.get('[data-cy=authorities]').click();
    cy.get('[data-cy=toggle').first().click();
    cy.get('[type=submit]').click();
    cy.wait('@create-new-user').its('response.statusCode').should('eq', 400);
  });

  it('View a user', () => {
    cy.login();

    cy.intercept('/api/admin/users/mylogin1', {
      fixture: 'userView.json',
    }).as('user');
    cy.visit('/users/mylogin1/view');
    cy.wait('@user');
    cy.get('[data-cy=login]').should('have.text', 'mylogin1');
    cy.get('[data-cy=firstName]').should('have.text', 'myFirstName1');
    cy.get('[data-cy=lastName]').should('have.text', 'myLastName1');
    cy.get('[data-cy=email]').should('have.text', 'myemail1@localhost');
    cy.get('[data-cy=activated]').should('have.text', 'check_box');
    cy.get('[data-cy=profiles] .q-badge').each(item => {
      expect(['ROLE_USER', 'ROLE_ADMIN']).includes(item.text());
    });
  });

  it('Modify a user', () => {
    const timestamp = new Date().getTime();

    cy.login(() => {
      cy.request({
        method: 'POST',
        url: '/api/admin/users',
        auth: {
          bearer: `${sessionStorage['jhi-authenticationToken']}`,
        },
        body: {
          login: `myLogin${timestamp}`,
          firstName: 'myFirstname',
          lastName: 'myLastName',
          email: `myEmail${timestamp}@localhost`,
          langKey: 'en',
          authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        },
      });
    });

    cy.visit(`/users/mylogin${timestamp}/edit`);
    cy.get('[data-cy=login]').clear().type(`myLogin${timestamp}`);
    cy.get('[data-cy=firstName]').clear().type('myFirstname');
    cy.get('[data-cy=lastName]').clear().type('myLastname');
    cy.get('[data-cy=email]').clear().type(`myEmail${timestamp}@localhost`);
    cy.get('[data-cy=activated]').click();
    cy.get('[data-cy=langKey]').click();
    cy.get('.q-menu .q-item').first().click();
    cy.get('[data-cy=authorities]').click();
    cy.get('[data-cy=toggle').first().click();
    cy.get('[type=submit]').click();
  });
});
