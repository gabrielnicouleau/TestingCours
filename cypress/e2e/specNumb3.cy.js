describe('fonction de contact API POKEMON fechData', () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/"); 
  });
  it("la div pokeListe doit être présente dès le chargement de la page",()=>{
    cy.get('#pokeListe').should('exist');
  });
  it("doit vérifier que le status de la réponse de l'API est 200",()=>{
    cy.request('GET', 'https://pokeapi.co/api/v2/pokemon').its('status').should('equal',200);
  });
  it("doit mesurer le temps de réponse de l'API", ()=>{
    const start = performance.now();
    cy.request('get','https://pokeapi.co/api/v2/pokemon').then((response)=>{
      const temps = performance.now()-start;
      expect(response.status).to.eq(200);
      expect(temps).to.be.lessThan(2000);
    });
  });
  it('doit vérifier que la réponse contient les champs attendus name et url', ()=>{
    cy.request('GET','https://pokeapi.co/api/v2/pokemon').then((response)=>{
      expect(response.body).to.have.property('results');
      expect(response.body.results[0]).to.have.all.keys('name','url')
    });
  });
  it('vérifier que BULBASAUR apparait en premier',()=>{
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon');
    cy.get('#pokeListe p').eq(0).should('have.text', 'bulbasaur');
  });
  it("doit pouvoir récupérer les noms des 20 premiers pokemon et les mettre dans des paragraphes dans l'ordre", () => {
    cy.wait(200).get('#pokeListe').children().should('have.length','20')
    cy.wait(200).get('#pokeListe').children().eq(0).should('have.text', 'bulbasaur')
    cy.wait(200).get('#pokeListe').children().eq(19).should('have.text', 'raticate')
  });
  it("devrait afficher un message d'erreur si l'API echoue",()=>{
    cy.intercep('GET','https://pokeapi.co/api/v2/pokemon',{statusCode: 500}).as('getPokemonError');
    cy.wait('@getPokemonError');
    cy.get('#error-message').should('be.visible');
  })
});