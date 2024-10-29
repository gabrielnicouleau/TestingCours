describe("Test de l'application counter", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/"); 
  });
  it('devrait afficher un compteur initiale de 0', () => {
    cy.get('#counter').should('have.text', 'count is 0');
  });
  it('le compteur devrait augmenter le nombre au click', () => {
    cy.get('#counter').click().should('have.text', `count is ${+1}`);
  })
  it ('le compteur devrait augmenter deux fois en deux click', () =>{
    for (let i=0;i<2;i++){
      cy.get('#counter').click();
      cy.get('#counter').should('have.text', `count is ${i+1}`);
    }
  })
  it ('le compteur devrait gérer plusieur augmentations correctement', () =>{
    for (let i=0; i<10;i++){
      cy.get('#counter').click();
      cy.get('#counter').should('have.text', `count is ${i+1}`);
    }
  })
  it('il devrait y avoir les bons logo avec les bons liens associés', () => {
    cy.get('.logo').first().should('have.attr','src','public/vite.svg')
    cy.get('.logo').last().should('have.attr','src','javascript.svg')
    cy.get('div a').first().should('have.attr', 'href','https://vitejs.dev')
    cy.get('div a').last().should('have.attr', 'href','https://developer.mozilla.org/en-US/docs/Web/JavaScript')
  })
})