describe("fonction d'addition d'inputs", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/"); 
  });

  it('devrait initialement afficher des inputs vides', () => {
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    first.should('have.text', '');
    second.should('have.text','');
  });
  it("devrait prendre en valeur les chiffres que l'on tape dans l'input", ()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    first.type(2).should('have.value', '2');
    second.type(3).should('have.value', '3');
  })
  it("devrait additionner le resultat des imputs",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type(2);
    second.type(3);
    button.click();
    cy.get('#result').should('have.text', '5');
  })
  it("devrait additionner deux nombre negatifs",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type(-6);
    second.type(-3);
    button.click();
    cy.get('#result').should('have.text', '-9');
  })
  it("devrait additionner deux 0",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type(0);
    second.type(0);
    button.click();
    cy.get('#result').should('have.text', '0');
  })
  it("devrait additionner deux grand nombres",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type(1000000);
    second.type(3000000);
    button.click();
    cy.get('#result').should('have.text', '4000000');
  })
  it("devrait additionner deux grand nombres negatifs",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type(-1000000);
    second.type(-3000000);
    button.click();
    cy.get('#result').should('have.text', '-4000000');
  })
  it("ne devrait pas pouvoir calculer des champs vides",()=>{
    const button = cy.get('#calculBtn');
    button.click();
    cy.get('#result').should('have.text', 'NaN');
  })
  it("ne devrait pas pouvoir additionner un chiffre avec des lettres",()=>{
    const first = cy.get('#firstNumber');
    const second = cy.get('#secondNumber');
    const button = cy.get('#calculBtn');
    first.type('abc');
    second.type(2);
    button.click();
    cy.get('#result').should('have.text', 'NaN');
  })
})