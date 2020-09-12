it('has an overview site', () => {
    cy.visit('/js')
    cy.contains('Classes')
    cy.contains('Global Functions')
})
